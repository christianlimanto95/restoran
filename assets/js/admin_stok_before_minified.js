$(function() {
    $(window).off("keydown", window_keydown_left);
    $(window).off("keydown", window_keydown_right);

    get_all_bahan();

    $(".btn-tambah-stok").on("click", function() {
        insert_bahan();
    });

    $(document).on("click", ".btn-tambah", function() {
        var tr = $(this).closest("tr");
        var bahan_id = tr.attr("data-id");
        var bahan_nama = tr.attr("data-nama");
        var bahan_stok = tr.attr("data-stok");
        var bahan_satuan = tr.attr("data-satuan");

        $(".dialog-tambah").attr("data-id", bahan_id);
        $(".dialog-tambah .dialog-tambah-nama").html(bahan_nama);
        $(".dialog-tambah .dialog-tambah-stok").html(bahan_stok + " " + bahan_satuan);
        $(".dialog-tambah .input-satuan").html(bahan_satuan);
        $(".dialog-tambah .tambah-qty").val("0");
        showDialog($(".dialog-tambah"));
    });

    $(".btn-confirm-tambah").on("click", function() {
        tambah_stok();
    });

    $(document).on("click", ".btn-kurang", function() {
        var tr = $(this).closest("tr");
        var bahan_id = tr.attr("data-id");
        var bahan_nama = tr.attr("data-nama");
        var bahan_stok = tr.attr("data-stok");
        var bahan_satuan = tr.attr("data-satuan");

        $(".dialog-kurang").attr("data-id", bahan_id);
        $(".dialog-kurang .dialog-tambah-nama").html(bahan_nama);
        $(".dialog-kurang .dialog-tambah-stok").html(bahan_stok + " " + bahan_satuan);
        $(".dialog-kurang .input-satuan").html(bahan_satuan);
        $(".dialog-kurang .tambah-qty").val("0");
        showDialog($(".dialog-kurang"));
    });

    $(".btn-confirm-kurang").on("click", function() {
        kurang_stok();
    });

    $(".tambah-qty").on("blur", function() {
        var value = parseInt($(this).val());
        if (isNaN(value) || value == 0) {
            $(this).val(0);
        }
    });

    $(document).on("click", ".btn-hapus", function() {
        var bahan_id = $(this).closest("tr").attr("data-id");
        $(".dialog-hapus").attr("data-id", bahan_id);
        showDialog($(".dialog-hapus"));
    });

    $(".input-jumlah-stok").on("blur", function() {
        var value = parseInt($(this).val());
        if (isNaN(value) || value == 0) {
            $(this).val(1);
        } else {
            $(this).val(value);
        }
    });

    $(".btn-confirm-delete").on("click", function() {
        var bahan_id = $(this).closest(".dialog").attr("data-id");
        delete_bahan(bahan_id);
    });
});

function get_all_bahan() {
    ajaxCall(get_all_bahan_url, null, function(json) {
        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<tr data-id='" + data[i].bahan_id + "' data-nama='" + data[i].bahan_nama + "' data-stok='" + data[i].bahan_stok + "' data-satuan='" + data[i].bahan_satuan + "'>";
            element += "<td>" + data[i].bahan_id + "</td>";
            element += "<td>" + data[i].bahan_nama + "</td>";
            element += "<td>" + data[i].bahan_stok + " " + data[i].bahan_satuan + "</td>";
            element += "<td><div class='button btn-tambah'>TAMBAH</div><div class='button btn-kurang'>KURANG</div><div class='button btn-hapus'>HAPUS</div></td>";
            element += "</tr>";
        }
        $(".table-list-stok tbody").html(element);
    });
}

function insert_bahan() {
    var nama = $(".input-nama").val().trim();
    var stok = $(".input-jumlah-stok").val();
    removeAllErrors();
    if (nama == "") {
        $(".error-nama").html("Nama harus diisi");
    } else {
        ajaxCall(insert_bahan_url, {nama: nama, stok: stok}, function(json) {
            var result = jQuery.parseJSON(json);
            if (result.status == "success") {
                $(".input-nama").val("");
                $(".input-jumlah-stok").val(1);
                get_all_bahan();
                showNotification("Stok Berhasil Dimasukkan");
            }
        });
    }
}

function tambah_stok() {
    var bahan_id = $(".dialog-tambah").attr("data-id");
    var bahan_qty = parseInt($(".dialog-tambah .tambah-qty").val());
    if (bahan_qty == 0) {
        showNotification("Jumlah tidak boleh 0");
    } else {
        ajaxCall(tambah_stok_url, {bahan_id: bahan_id, bahan_qty: bahan_qty}, function(json) {
            closeDialog();
            var result = jQuery.parseJSON(json);
            if (result.status == "success") {
                get_all_bahan();
                showNotification("Berhasil Tambah Stok");
            } else {
                showNotification("Gagal Tambah Stok");
            }
        });
    }
}

function kurang_stok() {
    var bahan_id = $(".dialog-kurang").attr("data-id");
    var bahan_qty = parseInt($(".dialog-kurang .tambah-qty").val());
    if (bahan_qty == 0) {
        showNotification("Jumlah tidak boleh 0");
    } else {
        ajaxCall(kurang_stok_url, {bahan_id: bahan_id, bahan_qty: bahan_qty}, function(json) {
            closeDialog();
            var result = jQuery.parseJSON(json);
            if (result.status == "success") {
                get_all_bahan();
                showNotification("Berhasil Mengurangi Stok");
            } else {
                showNotification("Gagal Mengurangi Stok");
            }
        });
    }
}

function delete_bahan(bahan_id) {
    ajaxCall(delete_bahan_url, {bahan_id: bahan_id}, function(json) {
        closeDialog();
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            get_all_bahan();
            showNotification("Berhasil Hapus Stok");
        } else {
            if (result.error_message == "exist_in_menu_bahan") {
                showNotification("Stok masih ada di menu");
            } else {
                showNotification("Gagal Hapus Stok");
            }
        }
    });
}