<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
NOTE
Just put general function which frequently used in this class
**/

class General_controller extends CI_Controller
{
    protected $additional_files = "";
    protected $additional_css = "";
    protected $additional_js = "";
   
    public function __construct()
    {
        parent::__construct();
        $this->load->model('common/General_model');
    }

	public function load_module($module_name) {
		$this->load_additional_css($module_name);
		$this->load_additional_js($module_name);
	}
	
	public function load_additional_css($file_name) {
		$this->additional_css .= "<link href='" . base_url("assets/css/template/" . $file_name . ".css") . "' rel='stylesheet'>";
	}
	
	public function load_additional_js($file_name) {
		$this->additional_js .= "<script src='" . base_url("assets/js/template/" . $file_name . ".js") . "' defer></script>";
	}

    public function view($file, $data){
        $data["additional_css"] = $this->additional_css;
        $data["additional_js"] = $this->additional_js;
		$data["page_name"] = $file;
		
        $this->load->view('common/header', $data);
        $this->load->view($file, $data);
        $this->load->view('common/footer');
    }

	public function cek_login() {
        if ($this->session->userdata('isLoggedIn') != 1) {
            redirect(base_url());
        }
    }
}