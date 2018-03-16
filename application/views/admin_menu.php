<div class="title" >Dapur Babi</div>
<a href="<?php echo base_url("admin"); ?>" class="admin-back-button" style="background-image: url(<?php echo base_url("assets/images/back.png"); ?>);"></a>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="section">
    <div class="section-left">
        <div class="section-title">TAMBAH JENIS MENU</div>
        <div class="form-item">
            <div class="form-label">NAMA</div>
            <input type="text" class="form-input input-nama-menu" />
        </div>
        <div class="form-item">
            <div class="form-label">JENIS</div>
            <input type="text" class="form-input input-jenis-menu" />
        </div>
        <div class="form-item">
            <div class="form-label">HARGA</div>
            <input type="text" class="form-input input-harga-menu" data-type="number" />
        </div>
        <div class="title-bahan-makanan">BAHAN MAKANAN</div>
        <table class="table-bahan">
            <thead>
                <tr>
                    <td>NAMA</td>
                    <td>JUMLAH</td>
                    <td>ACTION</td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div class="btn-tambah-bahan">+</div>
    </div>
    <div class="section-right">
        <div class="section-title">LIST MENU</div>
        <table class="table-menu">
            <thead>
                <tr>
                    <td>KODE</td>
                    <td>NAMA</td>
                    <td>JENIS</td>
                    <td>HARGA</td>
                    <td>ACTION</td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<div class="dialog dialog-tambah-bahan">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-title">Bahan Makanan</div>
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">
                <table class="table-dialog-tambah-bahan">
                    <tbody>
                        <tr>
                            <td>Nama Bahan</td>
                            <td>
                                <div class="select select-bahan">
                                    <input type="text" class="input-nama-bahan select-text" />
                                    <div class="option-container option-container-nama-bahan"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Pemakaian Per Menu</td>
                            <td><input type="text" maxlength="5" class="input-qty-bahan" data-type="number" value="0" /> g</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-tambah-bahan">TAMBAH</div>
            </div>
        </div>
    </div>
</div>
<script>
var get_all_menu_url = "<?php echo base_url("admin/get_all_menu"); ?>";
var get_all_bahan_url = "<?php echo base_url("admin/get_all_bahan_by_keyword"); ?>";
</script>