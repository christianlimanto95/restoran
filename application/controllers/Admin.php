<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include general controller supaya bisa extends General_controller
require_once("application/core/General_controller.php");

class Admin extends General_controller {
	public function __construct() {
		parent::__construct();
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
		$bahan_nama = $this->input->post("nama");
		$bahan_stok = $this->input->post("stok");

		if ($bahan_nama && $bahan_stok) {
			$bahan_satuan = "g";
			$bahan_keterangan = "";

			$data = array(
				"bahan_nama" => $bahan_nama,
				"bahan_stok" => $bahan_stok,
				"bahan_satuan" => $bahan_satuan,
				"bahan_keterangan" => $bahan_keterangan,
				"user_id" => 0
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
		$bahan_id = intval($this->input->post("bahan_id"));
		$result = $this->Admin_model->delete_bahan($bahan_id);
		echo json_encode($result);
	}
}
