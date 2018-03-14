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
		$username = $this->input->post("username", true);
		$password = $this->input->post("password", true);
		if ($username != "" && $password != "") {
			$stored_password = $this->Login_model->get_password($username);
			if (sizeof($stored_password) > 0) {
				if (password_verify($password, $stored_password)) {
					$this->session->set_userdata("isLoggedIn", 1);
					echo json_encode(array(
						"status" => "success"
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
		$this->session->unset_userdata("isLoggedIn");
		redirect(base_url());
	}
}
