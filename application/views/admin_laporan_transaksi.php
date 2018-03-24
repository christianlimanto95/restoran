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
        <a href="<?php echo base_url("admin/laporan_periode"); ?>" class="laporan-tab laporan-tab-periode">LAPORAN PERIODE</a>
        <div class="laporan-tab laporan-tab-transaksi active">LAPORAN TRANSAKSI</div>
    </div>
    <div class="laporan-transaksi-header">
        <div class="laporan-transaksi-header-left">
            <div class="laporan-transaksi-header-label">DARI : </div>
            <input type="text" class="laporan-transaksi-header-input input-date-start" />
            <div></div>
            <div class="laporan-transaksi-header-label">SAMPAI : </div>
            <input type="text" class="laporan-transaksi-header-input input-date-end" />
        </div>
        <div class="laporan-transaksi-header-right">
            <span class="grand-total-label">GRAND TOTAL : </span>
            <span class="grand-total-value">0</span>
            <div class="export-to-excel">
                <div class="excel-icon" style="background-image: url(<?php echo base_url("assets/images/excel.png"); ?>);"></div>
                <div class="excel-text">EXPORT TO EXCEL</div>
            </div>
        </div>
    </div>
    <div class="laporan-transaksi-table-container">
        <table class="table-transaksi" id="data-table">
            <thead>
                <tr>
                    <td>TANGGAL</td>
                    <td>NO. NOTA</td>
                    <td>MENU</td>
                    <td>HARGA</td>
                    <td>JUMLAH</td>
                    <td>SUBTOTAL</td>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </div>
</div>
<script>
var laporan_transaksi_url = "<?php echo base_url("admin/get_laporan_transaksi"); ?>";
</script>