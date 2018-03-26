$(function() {
    $(document).on("click", ".btn-detail", function() {
        var h_transaksi_id = $(this).closest("tr").attr("data-id");
        var dialogDetailTransaksi = $(".dialog-detail-transaksi");
        dialogDetailTransaksi.find(".dialog-title").html("DETAIL TRANSAKSI " + h_transaksi_id);
        dialogDetailTransaksi.attr("data-id", h_transaksi_id);
        showDialog(dialogDetailTransaksi);
    });

    $(".dialog-detail-transaksi").on("dialogShown", function() {
        get_transaksi_detail();
    });

    $(".dialog-detail-transaksi").on("dialogClosed", function() {
        $(".table-detail-transaksi tbody").html("");
    });
});

function script1onload() {
    $(".input-date-start").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function() {
            var dateEnd = $(".input-date-end").val();
            if (dateEnd != "") {
                get_data();
            }
        }
    });

    $(".input-date-end").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function() {
            var dateStart = $(".input-date-start").val();
            if (dateStart != "") {
                get_data();
            }
        }
    });
}

function get_data() {
    var start_date = $(".input-date-start").val();
    var end_date = $(".input-date-end").val();
    var date = {
        start_date: start_date,
        end_date: end_date
    };

    get_transaksi_bahan(date);
    get_stock_bahan(date);
    get_total(date);
    get_daftar_transaksi(date);
    get_menu_terjual(date);

    showNotification("Result Updated");
}

function get_transaksi_bahan(date) {
    ajaxCall(get_transaksi_bahan_url, {start_date: date.start_date, end_date: date.end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;

            var masuk = [];
            var masukElement = "";
            var keluar = [];
            var keluarElement = "";
            for (var i = 0; i < iLength; i++) {
                if (data[i].transaksi_bahan_qty < 0) {
                    if (!keluar.hasOwnProperty(data[i].bahan_id + "")) {
                        keluar[data[i].bahan_id + ""] = {
                            nama: data[i].bahan_nama,
                            qty: parseInt(data[i].transaksi_bahan_qty.substring(1))
                        };
                    } else {
                        keluar[data[i].bahan_id + ""].qty += parseInt(data[i].transaksi_bahan_qty.substring(1));
                    }
                } else {
                    if (!masuk.hasOwnProperty(data[i].bahan_id + "")) {
                        masuk[data[i].bahan_id + ""] = {
                            nama: data[i].bahan_nama,
                            qty: parseInt(data[i].transaksi_bahan_qty)
                        };
                    } else {
                        masuk[data[i].bahan_id + ""].qty += parseInt(data[i].transaksi_bahan_qty);
                    }
                }
            }

            iLength = keluar.length;
            for (i in keluar) {
                keluarElement += "<tr>";
                keluarElement += "<td>" + keluar[i].nama + "</td>";
                keluarElement += "<td>" + addThousandSeparator(keluar[i].qty + "") + " g</td>";
                keluarElement += "</tr>";
            }
            $(".stok-keluar .table-stok tbody").html(keluarElement);

            iLength = masuk.length;
            for (i in masuk) {
                masukElement += "<tr>";
                masukElement += "<td>" + masuk[i].nama + "</td>";
                masukElement += "<td>" + addThousandSeparator(masuk[i].qty + "") + " g</td>";
                masukElement += "</tr>";
            }
            $(".stok-masuk .table-stok tbody").html(masukElement);
        }
    });
}

function get_stock_bahan(date) {
    ajaxCall(get_stock_bahan_url, {start_date: date.start_date, end_date: date.end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;
            var sisaElement = "";
            for (var i = 0; i < iLength; i++) {
                sisaElement += "<tr>";
                sisaElement += "<td>" + data[i].bahan_nama + "</td>";
                sisaElement += "<td>" + addThousandSeparator(data[i].bahan_stok) + " g</td>";
                sisaElement += "</tr>";
            }
            $(".stok-sisa .table-stok tbody").html(sisaElement);
        }
    });
}

function get_total(date) {
    ajaxCall(get_total_url, {start_date: date.start_date, end_date: date.end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data[0];
            $(".total-transaksi-value").html(data.count);
            $(".total-pemasukan-value").html(addThousandSeparator(data.total));
            $(".total-modal-value").html(addThousandSeparator(data.modal));
        }
    });
}

function get_daftar_transaksi(date) {
    ajaxCall(get_daftar_transaksi_url, {start_date: date.start_date, end_date: date.end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;
            var element = "";
            for (var i = 0; i < iLength; i++) {
                element += "<tr data-id='" + data[i].h_transaksi_id + "'>";
                element += "<td>" + data[i].h_transaksi_id + "</td>";
                element += "<td>" + addThousandSeparator(data[i].h_transaksi_total) + "</td>";
                element += "<td><div class='btn-detail'>DETAIL</div></td>";
                element += "</tr>";
            }
            $(".table-daftar-transaksi tbody").html(element);
        }
    });
}

function get_menu_terjual(date) {
    ajaxCall(get_menu_terjual_url, {start_date: date.start_date, end_date: date.end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;
            var element = "";
            for (var i = 0; i < iLength; i++) {
                element += "<tr>";
                element += "<td>" + data[i].menu_nama + "</td>";
                element += "<td>" + data[i].count + "</td>";
                element += "</tr>";
            }
            $(".table-daftar-makanan tbody").html(element);
        }
    });
}

function get_transaksi_detail() {
    var h_transaksi_id = $(".dialog-detail-transaksi").attr("data-id");
    ajaxCall(get_transaksi_detail_url, {h_transaksi_id: h_transaksi_id}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;
            var element = "";
            for (var i = 0; i < iLength; i++) {
                element += "<tr>";
                element += "<td>" + data[i].menu_id + "</td>";
                element += "<td>" + data[i].menu_nama + "</td>";
                element += "<td>" + data[i].menu_harga + "</td>";
                element += "<td>" + data[i].menu_qty + "</td>";
                element += "<td>" + data[i].menu_subtotal + "</td>";
                element += "</tr>";
            }
            $(".table-detail-transaksi tbody").html(element);
        }
    });
}