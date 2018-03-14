<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include general controller supaya bisa extends General_controller
require_once("application/core/General_controller.php");

class Kasir extends General_controller {
	public function __construct() {
		parent::__construct();
		parent::redirect_if_not_logged_in();
		$this->load->model("Kasir_model");
	}
	
	public function index()
	{
		$data = array(
			"title" => "Kasir"
		);
		
		parent::view("kasir", $data);
	}

	function get_all_menu() {
		$keyword = $this->input->post("keyword");
		$menus = $this->Kasir_model->get_all_menu($keyword);
		$iLength = sizeof($menus);
		for ($i = 0; $i < $iLength; $i++) {
			$menus[$i]->menu_id = str_pad($menus[$i]->menu_id, 3, "0", STR_PAD_LEFT);
			$menus[$i]->menu_harga = number_format($menus[$i]->menu_harga, 0, ", ", ".");
		}
		echo json_encode(array(
			"status" => "success",
			"data" => $menus
		));
	}
}
