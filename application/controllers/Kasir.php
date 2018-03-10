<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include general controller supaya bisa extends General_controller
require_once("application/core/General_controller.php");

class Kasir extends General_controller {
	public function __construct() {
		parent::__construct();
		$this->load->model("Kasir_model");
	}
	
	public function index()
	{
		$data = array(
			"title" => "Kasir"
		);
		
		parent::view("kasir", $data);
	}
}