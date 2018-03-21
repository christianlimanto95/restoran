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
            <div class="form-label">NAMA <span class="error error-menu-nama"></span></div>
            <input type="text" class="form-input input-nama-menu" maxlength="30" />
        </div>
        <div class="form-item">
            <div class="form-label">JENIS</div>
            <div class="select select-jenis" data-value="1">
                <div class="form-input input-jenis-menu select-text" >MAKANAN</div>
                <div class="option-container option-container-jenis">
                    <div class="option tabindex-exception jenis-option" data-value="1">MAKANAN</div>
                    <div class="option tabindex-exception jenis-option" data-value="2">MINUMAN</div>
                </div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-label">HARGA MODAL <span class="error error-menu-modal"></span></div>
            <input type="text" class="form-input input-modal-menu" data-type="number" data-thousand-separator="true" maxlength="9" value="0" />
        </div>
        <div class="form-item">
            <div class="form-label">HARGA JUAL <span class="error error-menu-harga"></span></div>
            <input type="text" class="form-input input-harga-menu" data-type="number" data-thousand-separator="true" maxlength="9" value="0" />
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
        <div class="btn-tambah-bahan" data-source="tambah_bahan">+</div>
        <div class="button btn-tambah-menu">TAMBAH MENU</div>
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
            <div class="dialog-title">BAHAN MAKANAN</div>
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
                            <td><input type="text" maxlength="6" class="input-qty-bahan" data-type="number" data-thousand-separator="true" value="0" /> g</td>
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
<div class="dialog dialog-konfirmasi-hapus">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">Hapus Menu?</div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-hapus">HAPUS</div>
            </div>
        </div>
    </div>
</div>
<div class="dialog dialog-edit-menu">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-title">UBAH MENU</div>
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">
                <div class="button btn-edit-bahan">UBAH BAHAN MAKANAN</div>
                <table class="table table-edit-menu">
                    <tbody>
                        <tr>
                            <td class="table-label">NAMA</td>
                            <td class="table-value">
                                <input type="text" class="table-input menu-edit-nama" maxlength="30" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">JENIS</td>
                            <td class="table-value">
                                <div class="select select-edit-jenis" data-value="1">
                                    <div class="input-edit-jenis-menu select-text" >MAKANAN</div>
                                    <div class="option-container option-container-edit-jenis">
                                        <div class="option tabindex-exception edit-jenis-option" data-value="1">MAKANAN</div>
                                        <div class="option tabindex-exception edit-jenis-option" data-value="2">MINUMAN</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">MODAL</td>
                            <td class="table-value">
                                <input type="text" class="table-input menu-edit-modal" data-type="number" data-thousand-separator="true" maxlength="8" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">HARGA</td>
                            <td class="table-value">
                                <input type="text" class="table-input menu-edit-harga" data-type="number" data-thousand-separator="true" maxlength="8" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-edit-menu">SIMPAN</div>
            </div>
        </div>
    </div>
</div>
<div class="dialog dialog-edit-bahan">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-title">UBAH BAHAN <br /><span class="dialog-edit-bahan-menu">KOLOKE</span></div>
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">
                <table class="table-ubah-bahan">
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
                <div class="btn-tambah-bahan" data-source="edit_bahan">+</div>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-edit-bahan">SIMPAN</div>
            </div>
        </div>
    </div>
</div>
<script>
var get_all_menu_url = "<?php echo base_url("admin/get_all_menu"); ?>";
var get_all_bahan_url = "<?php echo base_url("admin/get_all_bahan_by_keyword"); ?>";
var insert_menu_url = "<?php echo base_url("admin/insert_menu"); ?>";
var update_menu_url = "<?php echo base_url("admin/update_menu"); ?>";
var get_bahan_by_menu_url = "<?php echo base_url("admin/get_bahan_by_menu"); ?>";
var update_menu_bahan_url = "<?php echo base_url("admin/update_menu_bahan"); ?>";
var delete_menu_url = "<?php echo base_url("admin/delete_menu"); ?>";
</script>