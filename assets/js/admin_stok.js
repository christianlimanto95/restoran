$(function() {
    get_all_bahan();

    $(".btn-tambah-stok").on("click", function() {
        insert_bahan();
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
            element += "<tr data-id='" + data[i].bahan_id + "'>";
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