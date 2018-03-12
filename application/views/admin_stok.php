<div class="title" >Dapur Babi</div>
<div class="center">
    <div class="tambah-stok-container">
        <div class="tambah-stok-title">TAMBAH JENIS STOK</div>
        <div class="form-item">
            <div class="form-label">NAMA</div>
            <input type="text" class="form-input" maxlength="50" />
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
<script>
var get_all_bahan_url = "<?php echo base_url("admin/get_all_bahan"); ?>";
</script>