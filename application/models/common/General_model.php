<?php

class General_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function is_admin($user_id) {
        $query = $this->db->query("
            SELECT role_id
            FROM user
            WHERE user_id = '" . $user_id . "'
            LIMIT 1
        ");
        $result = $query->result();
        if (sizeof($result) > 0) {
            if ($result[0]->role_id == "1") {
                return true;
            }
        }
        return false;
    }
}
