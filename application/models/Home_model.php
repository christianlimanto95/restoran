<?php

class Home_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_password($username) {
        $this->db->where("user_username", $username);
        $this->db->select("user_password");
        $this->db->limit(1);
        return $this->db->get("user")->result();
    }
}
