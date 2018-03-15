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
                <tr>
                    <td>001</td>
                    <td>NASI BABI KECAP</td>
                    <td>MAKANAN</td>
                    <td>Rp. 12.000</td>
                    <td>
                        <div class="btn-ubah">UBAH</div>
                        <div class="btn-hapus">HAPUS</div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>