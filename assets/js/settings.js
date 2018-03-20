$(function() {
	$(".btn-simpan").on("click", function() {
		change_password();
	});

	$(".form-input").on("keyup", function(e) {
		if (e.which == 13) {
			change_password();
		}
	});
});

function change_password() {
	removeAllErrors();
	var valid = true;

	var old_password = $(".input-old-password").val().trim();
	if (old_password == "") {
		valid = false;
		$(".error-old-password").html("harus diisi");
	}

	var new_password = $(".input-new-password").val().trim();
	if (new_password == "") {
		valid = false;
		$(".error-new-password").html("harus diisi");
	}

	var confirm_password = $(".input-confirm-password").val().trim();
	if (confirm_password == "") {
		valid = false;
		$(".error-confirm-password").html("harus diisi");
	} else if (confirm_password != new_password) {
		valid = false;
		$(".error-confirm-password").html("harus sama dengan PASSWORD BARU");
	}

	if (valid) {
		ajaxCall(change_password_url, {old_password: old_password, new_password: new_password}, function(json) {
			var result = jQuery.parseJSON(json);
			if (result.status == "success") {
				showNotification("Berhasil Ubah Password");
				$(".form-input").val("");
			} else {
				if (result.error_message == "wrong_password") {
					showNotification("PASSWORD LAMA Salah");
					$(".input-old-password").select();
				} else {
					showNotification("Gagal Ubah Password");
				}
			}
		});
	}
}