<?php

class Kasir_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function get_all_menu($keyword) {
        $query = $this->db->query("
            SELECT *
            FROM menu
            WHERE CONCAT(LPAD(menu_id, 3, '0'), ' - ', menu_nama, ' - ', CAST(FORMAT(menu_harga, 0, 'id_ID') AS CHAR(11))) LIKE '%" . $keyword . "%'
        ");
        return $query->result();
    }
}
