<?php

class Kasir_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function get_all_menu($keyword) {
        $query = $this->db->query("
            SELECT m.*, d.diskon_nominal, d.diskon_satuan
            FROM menu m, diskon d
            WHERE m.status = 1 AND d.menu_id = m.menu_id AND CONCAT(LPAD(m.menu_id, 3, '0'), ' - ', m.menu_nama, ' - ', CAST(FORMAT(m.menu_harga, 0, 'id_ID') AS CHAR(11))) LIKE '%" . $keyword . "%'
        ");
        return $query->result();
    }

    function get_transaksi_subtotal($menu) {
        $subtotal = 0;
        $total_qty = 0;
        $menu_data = array();
        $iLength = sizeof($menu);
        for ($i = 0; $i < $iLength; $i++) {
            $this->db->select("m.menu_nama, m.menu_modal, m.menu_harga, d.diskon_nominal, d.diskon_satuan");
            $this->db->from("menu m, diskon d");
            $this->db->where("m.menu_id", $menu[$i]["menu_id"]);
            $this->db->where("m.menu_id = d.menu_id");
            $this->db->limit(1);
            $result = $this->db->get()->result();
            $nama = $result[0]->menu_nama;
            $modal = $result[0]->menu_modal;
            $harga = intval($result[0]->menu_harga);
            $diskon_nominal = intval($result[0]->diskon_nominal);
            $diskon_satuan = intval($result[0]->diskon_satuan);
            $menu_subtotal = intval($menu[$i]["menu_qty"]) * $harga;
            if ($diskon_nominal != 0) {
                if ($diskon_satuan == 1) {
                    $menu_subtotal -= $diskon_nominal;
                } else {
                    $menu_subtotal -= $diskon_nominal * $menu_subtotal / 100;
                }
            }

            array_push($menu_data, array(
                "menu_id" => $menu[$i]["menu_id"],
                "menu_nama" => $nama,
                "menu_modal" => $modal,
                "menu_qty" => intval($menu[$i]["menu_qty"]),
                "menu_harga" => $harga,
                "diskon_nominal" => $diskon_nominal,
                "diskon_satuan" => $diskon_satuan,
                "menu_subtotal" => $menu_subtotal
            ));

            $subtotal += $menu_subtotal;
            $total_qty += intval($menu[$i]["menu_qty"]);
        }
        return array(
            "menu" => $menu_data,
            "subtotal" => $subtotal,
            "total_qty" => $total_qty
        );
    }

    function transaksi($data) {
        $this->db->trans_start();

        $insertData = array(
            "meja_id" => $data["meja_id"],
            "user_id" => $data["user_id"],
            "h_transaksi_subtotal" => $data["h_transaksi_subtotal"],
            "h_transaksi_service_charge" => $data["h_transaksi_service_charge"],
            "h_transaksi_tax" => $data["h_transaksi_tax"],
            "h_transaksi_total" => $data["h_transaksi_total"],
            "h_transaksi_total_qty" => $data["h_transaksi_total_qty"],
            "created_by" => $data["user_id"],
            "modified_by" => $data["user_id"]
        );
        $this->db->insert("h_transaksi", $insertData);
        $h_transaksi_id = $this->db->insert_id();

        $menu = $data["menu"];
        $iLength = sizeof($menu);
        $insertDataArray = array();
        for ($i = 0; $i < $iLength; $i++) {
            array_push($insertDataArray, array(
                "h_transaksi_id" => $h_transaksi_id,
                "menu_id" => $menu[$i]["menu_id"],
                "menu_qty" => $menu[$i]["menu_qty"],
                "menu_nama" => $menu[$i]["menu_nama"],
                "menu_modal" => $menu[$i]["menu_modal"],
                "menu_harga" => $menu[$i]["menu_harga"],
                "diskon_nominal" => $menu[$i]["diskon_nominal"],
                "diskon_satuan" => $menu[$i]["diskon_satuan"],
                "menu_subtotal" => $menu[$i]["menu_subtotal"]
            ));
        }
        if ($iLength > 0) {
            $this->db->insert_batch("d_transaksi", $insertDataArray);
        }

        $bahan_array = array();

        for ($i = 0; $i < $iLength; $i++) {
            $this->db->select("bahan_id, bahan_qty");
            $this->db->where("menu_id", $menu[$i]["menu_id"]);
            $menu_bahan = $this->db->get("menu_bahan")->result();

            if ($menu_bahan != "") {
                $jLength = sizeof($menu_bahan);
                $insertDataArray = array();
                for ($j = 0; $j < $jLength; $j++) {
                    $pemakaian_bahan = intval($menu[$i]["menu_qty"]) * intval($menu_bahan[$j]->bahan_qty);
                    if (!array_key_exists("b" . $menu_bahan[$j]->bahan_id, $bahan_array)) {
                        $bahan_array["b" . $menu_bahan[$j]->bahan_id] = $pemakaian_bahan;
                    } else {
                        $bahan_array["b" . $menu_bahan[$j]->bahan_id] += $pemakaian_bahan;
                    }
                }
            }
        }

        $insertDataArray = array();
        foreach ($bahan_array as $key => $value) {
            array_push($insertDataArray, array(
                "bahan_id" => substr($key, 1),
                "transaksi_bahan_qty" => -$bahan_array[$key],
                "transaksi_bahan_sumber" => 2,
                "created_by" => $data["user_id"],
                "modified_by" => $data["user_id"]
            ));
        }
        if (sizeof($insertDataArray) > 0) {
            $this->db->insert_batch("transaksi_bahan", $insertDataArray);
        }

        $insertDataArray = array();
        foreach ($bahan_array as $key => $value) {
            $this->db->where("bahan_id", substr($key, 1));
            $this->db->set("bahan_stok", "bahan_stok - " . $bahan_array[$key], false);
            $this->db->set("modified_date", "NOW()", false);
            $this->db->set("modified_by", $data["user_id"]);
            $this->db->update("bahan");
        }

        $this->db->trans_complete();
        return $h_transaksi_id;
    }
}
