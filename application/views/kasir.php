<div class="title">Dapur Babi</div>
<?php
    if ($is_admin) {
        echo "<a href='" . base_url("admin") . "' class='admin-back-button' style='background-image: url(" . base_url("assets/images/back.png") . ");'></a>";
    }
?>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="center">
    <div class="subtotal" data-value="0">0</div>
    <div class="menu-chosen-container">
        <div class="select menu-chosen" tabindex="1" data-value="" >
            <input type="text" class="menu-chosen-text select-text" />
            <div class="option-container menu-option-container">
                
            </div>
        </div>
        <input class="qty" type="number" value="1" min="1" max="999" tabindex="2" />
        <div class="qty-add" tabindex="3">+</div>
    </div>
    <div class="detail">
        <table class="detail-table">
            <thead>
                <tr>
                    <td>KODE</td>
                    <td>NAMA</td>
                    <td>HARGA</td>
                    <td>JUMLAH</td>
                    <td>DISKON</td>
                    <td>SUBTOTAL</td>
                    <td>ACTION</td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="bayar">BAYAR</div>
</div>
<div class="dialog dialog-bayar">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">
                <span class="dialog-bayar-left">Total</span>
                <span class="dialog-bayar-titik-dua">: Rp</span>
                <span class="dialog-bayar-right dialog-bayar-total"></span>
                <br />
                <span class="dialog-bayar-left">Bayar</span>
                <span class="dialog-bayar-titik-dua">: Rp</span>
                <input class="dialog-bayar-right input-bayar" />
            </div>
            <div class="dialog-button-container">
                <div class="button btn-bayar">BAYAR</div>
            </div>
        </div>
    </div>
</div>
<div class="dialog dialog-confirm-bayar">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-text">
                <span class="dialog-confirm-bayar-left">Total</span>
                <span class="dialog-confirm-bayar-titik-dua">: Rp</span>
                <span class="dialog-confirm-bayar-right dialog-confirm-bayar-total"></span>
                <br />
                <span class="dialog-confirm-bayar-left">Bayar</span>
                <span class="dialog-confirm-bayar-titik-dua">: Rp</span>
                <span class="dialog-confirm-bayar-right dialog-confirm-bayar-bayar"></span>
                <br />
                <span class="dialog-confirm-bayar-left">Kembali</span>
                <span class="dialog-confirm-bayar-titik-dua">: Rp</span>
                <span class="dialog-confirm-bayar-right dialog-confirm-bayar-kembali"></span>
                <br />
                Bayar?
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">BATAL</div>
                <div class="button btn-confirm-bayar">BAYAR</div>
            </div>
        </div>
    </div>
</div>
<script>
var get_all_menu_url = "<?php echo base_url("kasir/get_all_menu"); ?>";
var do_transaksi_url = "<?php echo base_url("kasir/do_transaksi"); ?>";
</script>