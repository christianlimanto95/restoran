<div class="title" >Dapur Babi</div>
<a href="<?php echo base_url("admin"); ?>" class="admin-back-button" style="background-image: url(<?php echo base_url("assets/images/back.png"); ?>);"></a>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="center">
    <div class="laporan-tab-container">
        <a href="<?php echo base_url("admin/laporan_harian"); ?>" class="laporan-tab laporan-tab-harian">LAPORAN HARI INI</a>
        <div class="laporan-tab laporan-tab-periode active">LAPORAN PERIODE</div>
        <a href="<?php echo base_url("admin/laporan_transaksi"); ?>" class="laporan-tab laporan-tab-transaksi">LAPORAN TRANSAKSI</a>
    </div>
    <div class="laporan-periode-header">
        <div class="laporan-periode-header-label">DARI : </div>
        <input type="text" class="laporan-periode-header-input input-date-start" />
        <div></div>
        <div class="laporan-periode-header-label">SAMPAI : </div>
        <input type="text" class="laporan-periode-header-input input-date-end" />
    </div>
    <div class="date"></div>
    <div class="stok-container">
        <div class="stok stok-masuk">
            <div class="stok-title">STOCK MASUK</div>
            <table class="table-stok">
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div class="stok stok-keluar">
            <div class="stok-title">STOCK KELUAR</div>
            <table class="table-stok">
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div class="stok stok-sisa">
            <div class="stok-title">SISA STOCK</div>
            <table class="table-stok">
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
    <div class="total">
        <span class="total-label">TOTAL TRANSAKSI : </span>
        <span class="total-value total-transaksi-value">0</span>
    </div>
    <div class="total">
        <span class="total-label">TOTAL PEMASUKAN : </span>
        <span class="total-value total-pemasukan-value">0</span>
    </div>
    <div class="daftar-container">
        <div class="daftar daftar-transaksi">
            <div class="daftar-title">DAFTAR TRANSAKSI</div>
            <table class="table-daftar-transaksi table-daftar">
                <thead>
                    <tr>
                        <td>KODE TRANSAKSI</td>
                        <td>TOTAL</td>
                        <td>ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div class="daftar daftar-makanan">
            <div class="daftar-title">DAFTAR MAKANAN/MINUMAN TERJUAL</div>
            <table class="table-daftar-makanan table-daftar">
                <thead>
                    <tr>
                        <td>MENU</td>
                        <td>JUMLAH</td>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="dialog dialog-detail-transaksi">
    <div class="dialog-background">
        <div class="dialog-box">
            <div class="dialog-close-icon" style="background-image: url(<?php echo base_url("assets/images/close_icon.png"); ?>);"></div>
            <div class="dialog-title">DETAIL TRANSAKSI</div>
            <div class="dialog-text">
                <table class="table-detail-transaksi">
                    <thead>
                        <tr>
                            <td>MENU ID</td>
                            <td>NAMA</td>
                            <td>HARGA</td>
                            <td>QTY</td>
                            <td>SUBTOTAL</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            <div class="dialog-button-container">
                <div class="button btn-cancel">TUTUP</div>
            </div>
        </div>
    </div>
</div>
<script>
var get_transaksi_bahan_url = "<?php echo base_url("admin/get_transaksi_bahan_today") ?>";
var get_stock_bahan_url = "<?php echo base_url("admin/get_stock_bahan_today") ?>";
var get_total_url = "<?php echo base_url("admin/get_total_today") ?>";
var get_daftar_transaksi_url = "<?php echo base_url("admin/get_daftar_transaksi_today") ?>";
var get_menu_terjual_url = "<?php echo base_url("admin/get_menu_terjual_today") ?>";
var get_transaksi_detail_url = "<?php echo base_url("admin/get_transaksi_detail") ?>";
</script>