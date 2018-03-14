<div class="title">Dapur Babi</div>
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
<script>
var get_all_menu_url = "<?php echo base_url("kasir/get_all_menu"); ?>";
</script>