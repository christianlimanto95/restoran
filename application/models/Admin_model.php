<?php

class Admin_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function get_all_menu() {
        return $this->db->get("menu")->result();
    }

    function get_all_bahan_by_keyword($keyword) {
        $query = $this->db->query("
            SELECT *
            FROM bahan
            WHERE status = 1 AND bahan_nama LIKE '%" . $keyword . "%'
        ");
        return $query->result();
    }

    function insert_menu($data) {
        $this->db->trans_start();

        $insertData = array(
            "menu_jenis" => $data["menu_jenis"],
            "menu_nama" => $data["menu_nama"],
            "menu_harga" => $data["menu_harga"],
            "created_by" => $data["user_id"],
            "modified_by" => $data["user_id"]
        );
        $this->db->insert("menu", $insertData);
        $menu_id = $this->db->insert_id();
        
        $bahan = $data["bahan"];
        $iLength = sizeof($bahan);
        $insertDataArray = array();
        for ($i = 0; $i < $iLength; $i++) {
            array_push($insertDataArray, array(
                "menu_id" => $menu_id,
                "bahan_id" => $bahan[$i]["bahan_id"],
                "bahan_qty" => $bahan[$i]["bahan_qty"],
                "created_by" => $data["user_id"],
                "modified_by" => $data["user_id"]
            ));
        }
        if ($iLength > 0) {
            $this->db->insert_batch("menu_bahan", $insertDataArray);
        }

        $this->db->trans_complete();
    }

    function get_all_bahan() {
        $query = $this->db->query("
            SELECT *
            FROM bahan
            WHERE status = 1
        ");
        return $query->result();
    }

    function insert_bahan($data) {
        $insertData = array(
            "bahan_nama" => $data["bahan_nama"],
            "bahan_stok" => $data["bahan_stok"],
            "bahan_satuan" => $data["bahan_satuan"],
            "bahan_keterangan" => $data["bahan_keterangan"],
            "created_by" => $data["user_id"],
            "modified_by" => $data["user_id"]
        );
        $this->db->insert("bahan", $insertData);
        return $this->db->affected_rows();
    }

    function tambah_stok($data) {
        $this->db->trans_start();

        $insertData = array(
            "bahan_id" => $data["bahan_id"],
            "transaksi_bahan_qty" => $data["transaksi_bahan_qty"],
            "transaksi_bahan_keterangan" => $data["transaksi_bahan_keterangan"],
            "created_by" => $data["user_id"],
            "modified_by" => $data["user_id"]
        );
        $this->db->insert("transaksi_bahan", $insertData);

        $this->db->set("bahan_stok", "bahan_stok + " . $data["transaksi_bahan_qty"], false);
        $this->db->set("modified_by", $data["user_id"]);
        $this->db->where("bahan_id", $data["bahan_id"]);
        $this->db->update("bahan");

        $this->db->trans_complete();

        return $this->db->affected_rows();
    }

    function delete_bahan($data) {
        $query = $this->db->query("
            SELECT bahan_id
            FROM menu_bahan
            WHERE bahan_id = " . $data["bahan_id"] . "
            LIMIT 1
        ");
        $bahan_from_menu = $query->result();
        if (sizeof($bahan_from_menu) > 0) {
            return array(
                "status" => "error",
                "error_message" => "exist_in_menu_bahan"
            );
        } else {
            $this->db->where("bahan_id", $data["bahan_id"]);
            $this->db->set("status", 0, true);
            $this->db->set("modified_date", "NOW()", false);
            $this->db->set("modified_by", $data["user_id"], true);
            $this->db->update("bahan");
            if ($this->db->affected_rows() > 0) {
                return array(
                    "status" => "success"
                );
            } else {
                return array(
                    "status" => "error",
                    "error_message" => ""
                );
            }
        }
    }
}
