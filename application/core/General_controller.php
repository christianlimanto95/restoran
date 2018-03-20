<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
NOTE
Just put general function which frequently used in this class
**/

class General_controller extends CI_Controller
{
    protected $script_count = 0;
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
		$this->additional_css .= "<link href='" . base_url("assets/css/common/" . $file_name . ".css") . "' rel='stylesheet'>";
	}
	
	public function load_additional_js($file_name) {
        $this->script_count++;
		$this->additional_js .= "<script onload='script" . $this->script_count . "onload()' src='" . base_url("assets/js/common/" . $file_name . ".js") . "' defer></script>";
	}

    public function view($file, $data){
        $data["additional_css"] = $this->additional_css;
        $data["additional_js"] = $this->additional_js;
		$data["page_name"] = $file;
		
        $this->load->view('common/header', $data);
        $this->load->view($file, $data);
        $this->load->view('common/footer');
    }

    public function redirect_if_not_logged_in() {
        if (!$this->session->userdata('user_id', true)) {
            redirect(base_url());
        }
    }
    
    public function is_logged_in() {
        return $this->session->userdata('user_id', true);
	}
	
	public function is_admin() {
        $user_id = $this->session->userdata('user_id', true);
        if ($user_id) {
            return $this->General_model->is_admin($user_id);
        }
        return false;
    }

    function show_404_if_not_ajax() {
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' )) {
            return true;
        } else {
            show_404();
        }
    }
}