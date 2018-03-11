<?php

class Kasir_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function get_all_menu() {
        $query = $this->db->query("
            SELECT *
            FROM menu
        ");
        return $query->result();
    }
}
