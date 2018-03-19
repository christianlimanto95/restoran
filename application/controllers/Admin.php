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

	function tambah_stok() {
		parent::show_404_if_not_ajax();
		$bahan_id = intval($this->input->post("bahan_id"));
		$bahan_qty = $this->input->post("bahan_qty");
		$keterangan = "";
		$user_id = parent::is_logged_in();

		if ($bahan_id && $bahan_qty && $user_id) {
			$data = array(
				"bahan_id" => $bahan_id,
				"transaksi_bahan_qty" => $bahan_qty,
				"transaksi_bahan_keterangan" => $keterangan,
				"user_id" => $user_id,
			);

			$affected_rows = $this->Admin_model->tambah_stok($data);
			echo json_encode(array(
				"status" => "success"
			));
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function kurang_stok() {
		parent::show_404_if_not_ajax();
		$bahan_id = intval($this->input->post("bahan_id"));
		$bahan_qty = $this->input->post("bahan_qty");
		$keterangan = "";
		$user_id = parent::is_logged_in();

		if ($bahan_id && $bahan_qty && $user_id) {
			$data = array(
				"bahan_id" => $bahan_id,
				"transaksi_bahan_qty" => -intval($bahan_qty),
				"transaksi_bahan_keterangan" => $keterangan,
				"user_id" => $user_id,
			);

			$affected_rows = $this->Admin_model->tambah_stok($data);
			echo json_encode(array(
				"status" => "success"
			));
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
		if ($bahan_id && $user_id) {
			$data = array(
				"bahan_id" => $bahan_id,
				"user_id" => $user_id
			);
			$result = $this->Admin_model->delete_bahan($data);
			echo json_encode($result);
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function menu() {
		$data = array(
			"title" => "Master Menu"
		);
		
		parent::view("admin_menu", $data);
	}

	function get_all_menu() {
		$menus = $this->Admin_model->get_all_menu();
		$iLength = sizeof($menus);
		for ($i = 0; $i < $iLength; $i++) {
			$menus[$i]->menu_id = str_pad($menus[$i]->menu_id, 3, "0", STR_PAD_LEFT);
		}
		echo json_encode(array(
			"status" => "success",
			"data" => $menus
		));
	}

	function get_all_bahan_by_keyword() {
		$keyword = $this->input->post("keyword");
		$data = $this->Admin_model->get_all_bahan_by_keyword($keyword);
		echo json_encode(array(
			"status" => "success",
			"data" => $data
		));
	}

	function insert_menu() {
		parent::show_404_if_not_ajax();
		$menu_jenis = $this->input->post("menu_jenis");
		$menu_nama = strtoupper($this->input->post("menu_nama"));
		$menu_harga = $this->input->post("menu_harga");
		$bahan = $this->input->post("bahan");
		$user_id = parent::is_logged_in();

		if ($menu_jenis && $menu_nama && $menu_harga && $user_id) {
			$bahan_array = array();
			if ($bahan != "") {
				$bahan_item = explode(";", $bahan);
				$iLength = sizeof($bahan_item);
				for ($i = 0; $i < $iLength; $i++) {
					$bahan_col = explode("~", $bahan_item[$i]);
					$bahan_id = $bahan_col[0];
					$bahan_qty = $bahan_col[1];
					
					array_push($bahan_array, array(
						"bahan_id" => $bahan_id,
						"bahan_qty" => $bahan_qty
					));
				}
			}

			$data = array(
				"menu_jenis" => $menu_jenis,
				"menu_nama" => $menu_nama,
				"menu_harga" => $menu_harga,
				"bahan" => $bahan_array,
				"user_id" => $user_id
			);
			$this->Admin_model->insert_menu($data);
			echo json_encode(array(
				"status" => "success"
			));
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function update_menu() {
		parent::show_404_if_not_ajax();

		$menu_id = $this->input->post("menu_id");
		$menu_jenis = $this->input->post("menu_jenis");
		$menu_nama = strtoupper($this->input->post("menu_nama"));
		$menu_harga = $this->input->post("menu_harga");
		$user_id = parent::is_logged_in();

		$data = array(
			"menu_id" => $menu_id,
			"menu_jenis" => $menu_jenis,
			"menu_nama" => $menu_nama,
			"menu_harga" => $menu_harga,
			"user_id" => $user_id
		);
		$affected_rows = $this->Admin_model->update_menu($data);
		if ($affected_rows > 0) {
			echo json_encode(array(
				"status" => "success"
			));
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function get_bahan_by_menu() {
		parent::show_404_if_not_ajax();
		$menu_id = $this->input->post("menu_id");
		$data = $this->Admin_model->get_bahan_by_menu_id($menu_id);
		echo json_encode(array(
			"status" => "success",
			"data" => $data
		));
	}

	function update_menu_bahan() {
		parent::show_404_if_not_ajax();
		$menu_id = $this->input->post("menu_id");
		$bahan = $this->input->post("bahan");
		$user_id = parent::is_logged_in();

		if ($menu_id) {
			$bahan_array = array();
			$bahan_item = explode(";", $bahan);
			$iLength = sizeof($bahan_item);
			for ($i = 0; $i < $iLength; $i++) {
				$bahan_col = explode("~", $bahan_item[$i]);
				$bahan_id = $bahan_col[0];
				$bahan_qty = $bahan_col[1];
				
				array_push($bahan_array, array(
					"bahan_id" => $bahan_id,
					"bahan_qty" => $bahan_qty
				));
			}

			$data = array(
				"menu_id" => $menu_id,
				"bahan" => $bahan_array,
				"user_id" => $user_id
			);
			$this->Admin_model->update_menu_bahan($data);
			echo json_encode(array(
				"status" => "success"
			));
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function delete_menu() {
		parent::show_404_if_not_ajax();
		$menu_id = $this->input->post("menu_id");
		$user_id = parent::is_logged_in();

		$data = array(
			"menu_id" => $menu_id,
			"user_id" => $user_id
		);
		$affected_rows = $this->Admin_model->delete_menu($data);
		if ($affected_rows > 0) {
			echo json_encode(array(
				"status" => "success"
			));
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}

	function laporan_harian() {
		setlocale(LC_ALL, "id_ID");
		$date = date("l, j F Y");
		$data = array(
			"title" => "Laporan Harian",
			"date" => $date
		);
		
		parent::view("admin_laporan_harian", $data);
	}

	function get_transaksi_bahan_today() {
		parent::show_404_if_not_ajax();
		$data = $this->Admin_model->get_transaksi_bahan_today();
		echo json_encode(array(
			"status" => "success",
			"data" => $data
		));
	}
}
