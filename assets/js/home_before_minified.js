$(function() {
	$(".btn-login").on("click", function() {
		do_login();
	});

	$(".form-input").on("keyup", function(e) {
		if (e.which == 13) {
			do_login();
		}
	});
});

function do_login() {
	removeAllErrors();
	var username = $(".input-username").val().trim();
	var password = $(".input-password").val().trim();
	var valid = true;
	if (username == "") {
		valid = false;
		$(".error-username").html("Username harus diisi");
	}
	if (password == "") {
		valid = false;
		$(".error-password").html("Password harus diisi");
	}

	if (valid) {
		ajaxCall(do_login_url, {username: username, password: password}, function(json) {
			var result = jQuery.parseJSON(json);
			if (result.status == "success") {
				if (result.role == "kasir") {
					window.location = kasir_url;
				} else if (result.role == "admin") {
					window.location = admin_url;
				}
			} else {
				showNotification("Username / Password Salah");
			}
		});
	}
}