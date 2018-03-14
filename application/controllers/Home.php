<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include general controller supaya bisa extends General_controller
require_once("application/core/General_controller.php");

class Home extends General_controller {
	public function __construct() {
		parent::__construct();
		
		$this->load->model("Home_model");
	}
	
	public function index()
	{
		$data = array(
			"title" => "Home"
		);
		
		parent::view("home", $data);
	}

	public function do_login() {
		parent::show_404_if_not_ajax();
		$username = $this->input->post("username", true);
		$password = $this->input->post("password", true);
		if ($username != "" && $password != "") {
			$data = $this->Home_model->get_data($username);
			if (sizeof($data) > 0) {
				if (password_verify($password, $data[0]->user_password)) {
					$this->session->set_userdata("user_id", $data[0]->user_id);
					$role = "kasir";
					if ($data[0]->role_id == "1") {
						$role = "admin";
					}

					echo json_encode(array(
						"status" => "success",
						"role" => $role
					));
				} else {
					echo json_encode(array(
						"status" => "error"
					));
				}
			} else {
				echo json_encode(array(
					"status" => "error"
				));
			}
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	public function logout() {
		$this->session->unset_userdata("user_id");
		redirect(base_url());
	}
}
