$(function() {
    get_transaksi_bahan();
    get_stock_bahan();
    get_total();
});

function get_transaksi_bahan() {
    ajaxCall(get_transaksi_bahan_url, null, function(json) {
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

function get_stock_bahan() {
    ajaxCall(get_stock_bahan_url, null, function(json) {
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

function get_total() {
    ajaxCall(get_total_url, null, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data[0];
            $(".total-transaksi-value").html(data.count);
            $(".total-pemasukan-value").html(addThousandSeparator(data.total));
        }
    });
}