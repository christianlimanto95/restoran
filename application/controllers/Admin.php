<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include general controller supaya bisa extends General_controller
require_once("application/core/General_controller.php");

class Admin extends General_controller {
	public function __construct() {
		parent::__construct();
		parent::redirect_if_not_logged_in();
		$is_admin = parent::is_admin();
		if (!$is_admin) {
			redirect(base_url("kasir"));
		}

		$this->load->model("Admin_model");
	}
	
	public function index()
	{
		$data = array(
			"title" => "Admin"
		);
		
		parent::view("admin", $data);
	}

	function stok() {
		$data = array(
			"title" => "Master Stok"
		);
		
		parent::view("admin_stok", $data);
	}

	function get_all_bahan() {
		parent::show_404_if_not_ajax();
		$data = $this->Admin_model->get_all_bahan();
		$iLength = sizeof($data);
		for ($i = 0; $i < $iLength; $i++) {
			$data[$i]->bahan_id = str_pad($data[$i]->bahan_id, 3, "0", STR_PAD_LEFT);
		}
		echo json_encode(array(
			"status" => "success",
			"data" => $data
		));
	}

	function insert_bahan() {
		parent::show_404_if_not_ajax();
		$bahan_nama = $this->input->post("nama");
		$bahan_stok = $this->input->post("stok");
		$user_id = parent::is_logged_in();

		if ($bahan_nama && $bahan_stok) {
			$bahan_satuan = "g";
			$bahan_keterangan = "";

			$data = array(
				"bahan_nama" => $bahan_nama,
				"bahan_stok" => $bahan_stok,
				"bahan_satuan" => $bahan_satuan,
				"bahan_keterangan" => $bahan_keterangan,
				"user_id" => $user_id
			);
			$affected_rows = $this->Admin_model->insert_bahan($data);
			if ($affected_rows > 0) {
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
	}

	function delete_bahan() {
		parent::show_404_if_not_ajax();
		$bahan_id = intval($this->input->post("bahan_id"));
		$user_id = parent::is_logged_in();
		$data = array(
			"bahan_id" => $bahan_id,
			"user_id" => $user_id
		);
		$result = $this->Admin_model->delete_bahan($data);
		echo json_encode($result);
	}
}
