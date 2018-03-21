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
		parent::load_additional_js("rsvp-3.1.0.min");
		parent::load_additional_js("sha-256.min");
		parent::load_additional_js("qz-tray");
		$is_admin = parent::is_admin();
		$data = array(
			"title" => "Kasir",
			"is_admin" => $is_admin
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

	function do_transaksi() {
		parent::show_404_if_not_ajax();

		$meja_id = 0;
		$menu = $this->input->post("menu");
		$menu_array = array();
		$menu_item = explode(";", $menu);
		$iLength = sizeof($menu_item);
		for ($i = 0; $i < $iLength; $i++) {
			$menu_col = explode("~", $menu_item[$i]);
			$menu_id = $menu_col[0];
			$menu_qty = $menu_col[1];

			array_push($menu_array, array(
				"menu_id" => intval($menu_id),
				"menu_qty" => $menu_qty
			));
		}

		$user_id = parent::is_logged_in();

		$subtotal_qty = $this->Kasir_model->get_transaksi_subtotal($menu_array);
		$subtotal = $subtotal_qty["subtotal"];
		$total_qty = $subtotal_qty["total_qty"];
		$menu_array = $subtotal_qty["menu"];

		$data = array(
			"meja_id" => "0",
			"user_id" => $user_id,
			"menu" => $menu_array,
			"h_transaksi_subtotal" => $subtotal,
			"h_transaksi_service_charge" => 0,
			"h_transaksi_tax" => 0,
			"h_transaksi_total" => $subtotal,
			"h_transaksi_total_qty" => $total_qty
		);
		$this->Kasir_model->transaksi($data);
		echo json_encode(array(
			"status" => "success"
		));
	}
}
