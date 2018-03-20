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

	public function settings() {
		parent::redirect_if_not_logged_in();
		$is_admin = parent::is_admin();
		$data = array(
			"title" => "Settings",
			"is_admin" => $is_admin
		);
		
		parent::view("settings", $data);
	}

	function change_password() {
		parent::redirect_if_not_logged_in();
		parent::show_404_if_not_ajax();
		$old_password = $this->input->post("old_password");
		$new_password = $this->input->post("new_password");
		$user_id = parent::is_logged_in();
		if ($old_password != "" && $new_password != "") {
			$stored_password = $this->Home_model->get_password($user_id);
			if (sizeof($stored_password) > 0) {
				$stored_password = $stored_password[0]->user_password;
				if (password_verify($old_password, $stored_password)) {
					$data = array(
						"new_password" => $new_password,
						"user_id" => $user_id
					);
					$affected_rows = $this->Home_model->change_password($data);
					if ($affected_rows > 0) {
						echo json_encode(array(
							"status" => "success"
						));
					} else {
						echo json_encode(array(
							"status" => "error",
							"error_message" => ""
						));
					}
				} else {
					echo json_encode(array(
						"status" => "error",
						"error_message" => "wrong_password"
					));
				}
			} else {
				echo json_encode(array(
					"status" => "error",
					"error_message" => ""
				));
			}
		} else {
			echo json_encode(array(
				"status" => "error",
				"error_message" => ""
			));
		}
	}

	public function logout() {
		$this->session->unset_userdata("user_id");
		redirect(base_url());
	}
}
