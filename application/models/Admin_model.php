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
}
