<?php

class Admin_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
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
