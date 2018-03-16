var get_all_bahan_ajax = null;
$(function() {
    get_all_menu();
    get_all_bahan(true);
    $(window).off("keydown", window_keydown_tab);

    $(".btn-tambah-bahan").on("click", function() {
        showDialog($(".dialog-tambah-bahan"));
    })

    $(".input-nama-bahan").on("input", function() {
        get_all_bahan();
    });

    $(".input-qty-bahan").on("keyup", function(e) {
        if (e.which == 13) {
            tambahBahan();
        }
    });

    $(".select-bahan").on("valueSelected", function() {
        var id = $(this).attr("data-value");
        var nama = $(this).find(".option[data-value='" + id + "']").attr("data-nama");
        $(this).attr("data-nama", nama);
    });

    $(".btn-confirm-tambah-bahan").on("click", function() {
        tambahBahan();
    });

    $(".btn-tambah-menu").on("click", function() {
        removeAllErrors();
        var valid = true;
        var menu_nama = $(".input-nama-menu").val().trim();
        if (menu_nama == "") {
            $(".error-menu-nama").html("harus diisi");
            valid = false;
        }

        var menu_harga = parseInt(removeThousandSeparator($(".input-harga-menu").val()));
        if (menu_harga == 0) {
            $(".error-menu-harga").html("harus lebih dari 0");
            valid = false;
        }

        if (valid) {
            var menu_jenis = $(".select-jenis").attr("data-value");
            var bahan = "";
            $(".table-bahan tbody tr").each(function() {
                var bahan_id = $(this).attr("data-id");
                var bahan_qty = $(this).attr("data-qty");
                if (bahan != "") {
                    bahan += ";";
                }
                bahan += bahan_id + "~" + bahan_qty;
            });
            
            ajaxCall(insert_menu_url, {menu_jenis: menu_jenis, menu_nama: menu_nama, menu_harga: menu_harga, bahan: bahan}, function(json) {
                var result = jQuery.parseJSON(json);
                if (result.status == "success") {
                    $(".input-nama-menu").val("");
                    $(".input-harga-menu").val("0");
                    showNotification("Berhasil Tambah Menu");
                    get_all_menu();
                }
            });
        } else {
            showNotification("Silakan periksa inputan");
        }
    });

    $(".dialog-tambah-bahan").on("dialogClosed", function() {
        $(".input-nama-bahan").val("");
        get_all_bahan(true);
        $(".input-qty-bahan").val(0);
    });

    $(document).on("click", ".btn-ubah", function() {
        var tr = $(this).closest("tr");
        var id = tr.attr("data-id");
        var nama = tr.attr("data-nama");
        var jenis = tr.attr("data-jenis");
        var harga = tr.attr("data-harga");

        var dialogEditMenu = $(".dialog-edit-menu");
        dialogEditMenu.attr("data-id", id);
        dialogEditMenu.find(".menu-edit-nama").val(nama);
        selectOption(dialogEditMenu.find(".edit-jenis-option[data-value='" + jenis + "']"));
        dialogEditMenu.find(".menu-edit-harga").val(addThousandSeparator(harga));
        showDialog(dialogEditMenu);
    });

    $(".btn-confirm-edit-menu").on("click", function() {
        var nama = $(".menu-edit-nama").val().trim().toUpperCase();
        if (nama == "") {
            showNotification("Nama tidak boleh kosong");
        } else {
            var harga = parseInt(removeThousandSeparator($(".menu-edit-harga").val()));
            if (harga == 0) {
                showNotification("Harga tidak boleh 0");
            } else {
                var jenis = $(".select-edit-jenis").attr("data-value");
                var id = $(".dialog-edit-menu").attr("data-id");

                ajaxCall(update_menu_url, {menu_id: id, menu_jenis: jenis, menu_nama: nama, menu_harga: harga}, function(json) {
                    var result = jQuery.parseJSON(json);
                    if (result.status == "success") {
                        get_all_menu();
                        closeDialog();
                        showNotification("Berhasil Update Menu " + nama);
                    } else {
                        showNotification("Gagal Update Menu");
                    }
                });
            }
        }
    });

    $(document).on("click", ".btn-hapus-bahan", function() {
        var tr = $(this).closest("tr");
        tr.remove();
    });

    $(document).on("click", ".btn-hapus", function() {
        var tr = $(this).closest("tr");
        var id = tr.attr("data-id");
        var nama = tr.attr("data-nama");
        var dialogKonfirmasiHapus = $(".dialog-konfirmasi-hapus");
        dialogKonfirmasiHapus.attr("data-id", id);
        dialogKonfirmasiHapus.find(".dialog-text").html("Hapus Menu " + nama + " ?");
        showDialog(dialogKonfirmasiHapus);
    });

    $(".btn-confirm-hapus").on("click", function() {
        deleteMenu();
    });
});

function deleteMenu() {
    var menu_id = $(".dialog-konfirmasi-hapus").attr("data-id");
    ajaxCall(delete_menu_url, {menu_id: menu_id}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            closeDialog();
            get_all_menu();
            showNotification("Berhasil Hapus Menu");
        } else {
            showNotification("Gagal Hapus Menu");
        }
    });
}

function tambahBahan() {
    var qty = parseInt(removeThousandSeparator($(".input-qty-bahan").val()));
    if (qty == 0) {
        showNotification("Pemakaian Per Menu minimal 1 g");
    } else {
        var id = $(".select-bahan").attr("data-value");
        var nama = $(".select-bahan").attr("data-nama");
        
        var element = "";
        element += "<tr data-id='" + id + "' data-qty='" + qty + "'>";
        element += "<td>" + nama + "</td>";
        element += "<td>" + qty + " g</td>";
        element += "<td><div class='btn-hapus-bahan'>HAPUS</div></td>";
        element += "</tr>";
        $(".table-bahan tbody").append(element);
        closeDialog();
    }
}

function get_all_menu() {
    ajaxCall(get_all_menu_url, null, function(json) {
        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            var jenis = "MAKANAN";
            if (data[i].menu_jenis == 2) {
                jenis = "MINUMAN";
            }

            element += "<tr data-id='" + data[i].menu_id + "' data-nama='" + data[i].menu_nama + "' data-jenis='" + data[i].menu_jenis + "' data-harga='" + data[i].menu_harga + "'>";
            element += "<td>" + data[i].menu_id + "</td>";
            element += "<td>" + data[i].menu_nama + "</td>";
            element += "<td>" + jenis + "</td>";
            element += "<td>" + addThousandSeparator(data[i].menu_harga) + "</td>";
            element += "<td><div class='btn-ubah'>UBAH</div><div class='btn-hapus'>HAPUS</div></td>";
            element += "</tr>";
        }

        $(".table-menu tbody").html(element);
    });
}

function get_all_bahan(first) {
    var value = $(".select-bahan .select-text").val().trim();
    if (get_all_bahan_ajax != null) {
        get_all_bahan_ajax.abort();
    }
    get_all_bahan_ajax = ajaxCall(get_all_bahan_url, {keyword: value}, function(json) {

        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<div class='bahan-option option tabindex-exception' data-value='" + data[i].bahan_id + "' tabindex='" + (i + 1) + "' data-nama='" + data[i].bahan_nama + "'>" + data[i].bahan_nama + "</div>";
        }
        $(".option-container-nama-bahan").html(element);
        if (first) {
            var optionFirst = $(".bahan-option").first();
            selectOption(optionFirst);
        } else {
            $(".select-bahan .option-container").addClass("show");
            $("body").addClass("option-container-show");
        }

        if (iLength > 0) {
            setOptionActive($(".select-bahan"), data[0].bahan_id);
        }
    });
}