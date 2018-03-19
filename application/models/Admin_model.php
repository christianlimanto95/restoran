<?php

class Admin_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function get_all_menu() {
        $this->db->where("status", 1);
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

    function get_bahan_by_menu_id($menu_id) {
        $query = $this->db->query("
            SELECT mb.*, b.bahan_nama
            FROM menu_bahan mb, bahan b
            WHERE mb.menu_id = " . $menu_id . " AND b.bahan_id = mb.bahan_id
        ");
        return $query->result();
    }

    function update_menu_bahan($data) {
        $this->db->trans_start();

        $this->db->where("menu_id", $data["menu_id"]);
        $this->db->set("modified_date", "NOW()", false);
        $this->db->set("modified_by", $data["user_id"], true);
        $this->db->update("menu");

        $this->db->where("menu_id", $data["menu_id"]);
        $this->db->delete("menu_bahan");

        $bahan = $data["bahan"];
        $iLength = sizeof($bahan);
        $insertDataArray = array();
        for ($i = 0; $i < $iLength; $i++) {
            array_push($insertDataArray, array(
                "menu_id" => $data["menu_id"],
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

    function update_menu($data) {
        $this->db->where("menu_id", $data["menu_id"]);
        $this->db->set("menu_nama", $data["menu_nama"], true);
        $this->db->set("menu_jenis", $data["menu_jenis"], true);
        $this->db->set("menu_harga", $data["menu_harga"], true);
        $this->db->set("modified_by", $data["user_id"], false);
        $this->db->set("modified_date", "NOW()", false);
        $this->db->update("menu");
        return $this->db->affected_rows();
    }

    function delete_menu($data) {
        $this->db->where("menu_id", $data["menu_id"]);
        $this->db->set("status", 0, true);
        $this->db->set("modified_date", "NOW()", false);
        $this->db->set("modified_by", $data["user_id"], true);
        $this->db->update("menu");
        return $this->db->affected_rows();
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

    function get_transaksi_bahan_today() {
        $query = $this->db->query("
            SELECT tb.bahan_id, b.bahan_nama, tb.transaksi_bahan_qty
            FROM transaksi_bahan tb, bahan b
            WHERE tb.bahan_id = b.bahan_id AND tb.created_date >= CURDATE() AND tb.created_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
        ");
        return $query->result();
    }

    function get_stock_bahan_today() {
        $query = $this->db->query("
            SELECT bahan_id, bahan_nama, bahan_stok, bahan_satuan
            FROM bahan
            WHERE status = 1
        ");
        return $query->result();
    }

    function get_total_today() {
        $query = $this->db->query("
            SELECT IFNULL(t.count, 0) AS count, IFNULL(t.total, 0) AS total
            FROM (SELECT COUNT(h_transaksi_id) AS count, SUM(h_transaksi_total) AS total FROM h_transaksi WHERE created_date >= CURDATE() AND created_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY)) t
        ");
        return $query->result();
    }
}
