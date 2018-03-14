<div class="title" >Dapur Babi</div>
<div class="center">
    <div class="form-item">
        <div class="form-label">USERNAME <span class="error error-username"></span></div>
        <input type="text" class="form-input input-username" maxlength="30" tabIndex="1" />
    </div>
    <div class="form-item">
        <div class="form-label">PASSWORD <span class="error error-password"></span></div>
        <input type="password" class="form-input input-password" maxlength="30" tabIndex="2" />
    </div>
    <div class="button btn-login">LOGIN</div>
</div>
<script>
var do_login_url = "<?php echo base_url("home/do_login"); ?>";
var kasir_url = "<?php echo base_url("kasir"); ?>";
var admin_url = "<?php echo base_url("admin"); ?>";
</script>