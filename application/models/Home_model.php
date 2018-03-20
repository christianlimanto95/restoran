<?php

class Home_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_data($username) {
        $this->db->where("user_username", $username);
        $this->db->select("user_id, user_password, role_id");
        $this->db->limit(1);
        return $this->db->get("user")->result();
    }

    function get_password($user_id) {
        $this->db->where("user_id", $user_id);
        $this->db->select("user_password");
        $this->db->limit(1);
        return $this->db->get("user")->result();
    }

    function change_password($data) {
        $data["new_password"] = password_hash($data["new_password"], PASSWORD_DEFAULT);
        $this->db->where("user_id", $data["user_id"]);
        $this->db->set("user_password", $data["new_password"], true);
        $this->db->set("modified_date", "NOW()", false);
        $this->db->set("modified_by", $data["user_id"], true);
        $this->db->update("user");
        return $this->db->affected_rows();
    }
}
