<div class="title" >Dapur Babi</div>
<?php
    if ($is_admin) {
        echo "<a href='" . base_url("admin") . "' class='admin-back-button' style='background-image: url(" . base_url("assets/images/back.png") . ");'></a>";
    } else {
        echo "<a href='" . base_url("kasir") . "' class='admin-back-button' style='background-image: url(" . base_url("assets/images/back.png") . ");'></a>";
    }
?>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="center">
    <div class="center-title">SETTINGS</div>
    <div class="form-item">
        <div class="form-label">PASSWORD LAMA <span class="error error-old-password"></span></div>
        <input type="password" class="form-input input-old-password" maxlength="30" tabIndex="1" />
    </div>
    <div class="form-item">
        <div class="form-label">PASSWORD BARU <span class="error error-new-password"></span></div>
        <input type="password" class="form-input input-new-password" maxlength="30" tabIndex="2" />
    </div>
    <div class="form-item">
        <div class="form-label">CONFIRM PASSWORD <span class="error error-confirm-password"></span></div>
        <input type="password" class="form-input input-confirm-password" maxlength="30" tabIndex="3" />
    </div>
    <div class="button btn-simpan">UBAH PASSWORD</div>
</div>
<script>
var change_password_url = "<?php echo base_url("home/change_password"); ?>";
</script>