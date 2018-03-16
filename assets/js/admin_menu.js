var get_all_bahan_ajax = null;
$(function() {
    get_all_menu();
    get_all_bahan(true);

    $(".input-nama-bahan").on("input", function() {
        get_all_bahan();
    });

    $(".input-qty-bahan").on("blur", function() {
        var value = parseInt($(this).val());
        if (isNaN(value)) {
            value = 0;
        }
        $(this).val(value);
    });

    $(".btn-confirm-tambah-bahan").on("click", function() {
        var qty = parseInt($(".input-qty-bahan").val());
        if (qty == 0) {
            showNotification("Pemakaian Per Menu minimal 1 g");
        }
    });
});

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