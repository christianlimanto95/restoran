<div class="title" >Dapur Babi</div>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="center">
    <div class="tambah-stok-container">
        <div class="tambah-stok-title">TAMBAH JENIS STOK</div>
        <div class="form-item">
            <div class="form-label">NAMA <span class="error error-nama"></span></div>
            <input type="text" class="form-input input-nama" maxlength="50" />
        </div>
        <div class="form-item">
            <div class="form-label">JUMLAH STOK</div>
            <input type="number" class="form-input input-jumlah-stok" min="1" value="1" />
            <span class="form-keterangan">gram</span>
        </div>
        <div class="button btn-tambah-stok">TAMBAH</div>
    </div>
    <div class="list-stok-container">
        <div class="list-stok-title">LIST STOCK</div>
        <table class="table table-list-stok">
            <thead>
                <tr>
                    <td>KODE</td>
                    <td>NAMA</td>
                    <td>JUMLAH STOK</td>
                    <td>ACTION</td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<div class="dialog dialog-hapus">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">Yakin Mau Hapus?</div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-delete">HAPUS</div>
            </div>
        </div>
    </div>
</div>
<div class="dialog dialog-tambah">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-title">TAMBAH STOK</div>
            <div class="dialog-text">
                <span class="dialog-tambah-left dialog-tambah-nama"></span><br />
                <span class="dialog-tambah-left">Stok Saat Ini : </span>
                <span class="dialog-tambah-right dialog-tambah-stok"></span><br />
                <span class="dialog-tambah-left">Tambah : </span>
                <span class="dialog-tambah-right dialog-tambah-right-input">
                    <input type="text" class="tambah-qty" value="0" data-type="number" maxlength="5" /
                ><span class="input-satuan">g</span></span>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-tambah">TAMBAH</div>
            </div>
        </div>
    </div>
</div>
<div class="dialog dialog-kurang">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-title">KURANGI STOK</div>
            <div class="dialog-text">
                <span class="dialog-tambah-left dialog-tambah-nama"></span><br />
                <span class="dialog-tambah-left">Stok Saat Ini : </span>
                <span class="dialog-tambah-right dialog-tambah-stok"></span><br />
                <span class="dialog-tambah-left">Dikurangi : </span>
                <span class="dialog-tambah-right dialog-tambah-right-input">
                    <input type="text" class="tambah-qty" value="0" data-type="number" maxlength="5" /
                ><span class="input-satuan">g</span></span>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-kurang">KURANGI</div>
            </div>
        </div>
    </div>
</div>
<script>
var get_all_bahan_url = "<?php echo base_url("admin/get_all_bahan"); ?>";
var insert_bahan_url = "<?php echo base_url("admin/insert_bahan") ?>";
var tambah_stok_url = "<?php echo base_url("admin/tambah_stok") ?>";
var kurang_stok_url = "<?php echo base_url("admin/kurang_stok") ?>";
var delete_bahan_url = "<?php echo base_url("admin/delete_bahan") ?>";
</script>