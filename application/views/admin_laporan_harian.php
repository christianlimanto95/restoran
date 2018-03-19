<div class="title" >Dapur Babi</div>
<a href="<?php echo base_url("admin"); ?>" class="admin-back-button" style="background-image: url(<?php echo base_url("assets/images/back.png"); ?>);"></a>
<div class="menu-icon" style="background-image: url(<?php echo base_url("assets/images/setting.png"); ?>);"></div>
<div class="menu-container">
    <a href="<?php echo base_url("home/settings"); ?>" class="menu">Settings</a>
    <a href="<?php echo base_url("home/logout"); ?>" class="menu">Logout</a>
</div>
<div class="center">
    <div class="laporan-tab-container">
        <div class="laporan-tab laporan-tab-harian active">LAPORAN HARI INI</div>
        <a href="<?php echo base_url("admin/laporan_periode"); ?>" class="laporan-tab laporan-tab-periode">LAPORAN PERIODE</a>
        <a href="<?php echo base_url("admin/laporan_transaksi"); ?>" class="laporan-tab laporan-tab-transaksi">LAPORAN TRANSAKSI</a>
    </div>
    <div class="date"><?php echo $date; ?></div>
    <div class="stok-container">
        <div class="stok stok-masuk">
            <div class="stok-title">STOCK MASUK</div>
            <table class="table-stok">
                <tbody>
                    <tr>
                        <td>BABI</td>
                        <td>: 5000 gram</td>
                    </tr>
                    <tr>
                        <td>MIE</td>
                        <td>: 5000 gram</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="stok stok-keluar">
            <div class="stok-title">STOCK KELUAR</div>
            <table class="table-stok">
                <tbody>
                    <tr>
                        <td>BABI</td>
                        <td>: 5000 gram</td>
                    </tr>
                    <tr>
                        <td>MIE</td>
                        <td>: 5000 gram</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="stok stok-sisa">
            <div class="stok-title">SISA STOCK</div>
            <table class="table-stok">
                <tbody>
                    <tr>
                        <td>BABI</td>
                        <td>: 5000 gram</td>
                    </tr>
                    <tr>
                        <td>MIE</td>
                        <td>: 5000 gram</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="total">
        <span class="total-label">TOTAL TRANSAKSI : </span>
        <span class="total-value">6</span>
    </div>
    <div class="total">
        <span class="total-label">TOTAL PEMASUKAN : </span>
        <span class="total-value">900.000</span>
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
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
                    <tr>
                        <td>DB1800001</td>
                        <td>34.000</td>
                        <td><div class="btn-detail">DETAIL</div></td>
                    </tr>
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
                    <tr>
                        <td>NASI BABI KECAP</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>ES TEH TAWAR</td>
                        <td>15</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>