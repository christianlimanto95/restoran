$(function() {
    get_laporan_transaksi();
});

function get_laporan_transaksi() {
    var start_date = "2018-03-19";
    var end_date = "2018-03-30";
    ajaxCall(laporan_transaksi_url, {start_date: start_date, end_date: end_date}, function(json) {
        var result = jQuery.parseJSON(json);
        if (result.status == "success") {
            var data = result.data;
            var iLength = data.length;
            var transaksi = [];
            var grand_total = 0;
            for (var i = 0; i < iLength; i++) {
                if (transaksi.hasOwnProperty(data[i].h_transaksi_id + "")) {
                    transaksi[data[i].h_transaksi_id + ""].data.push({
                        menu_id: data[i].menu_id,
                        menu_nama: data[i].menu_nama,
                        menu_harga: data[i].menu_harga,
                        menu_qty: data[i].menu_qty,
                        menu_subtotal: data[i].menu_subtotal
                    });
                } else {
                    transaksi[data[i].h_transaksi_id + ""] = {
                        date: data[i].created_date,
                        data: []
                    };
                }
            }

            var element = "";
            for (var h_transaksi_id in transaksi) {
                if (transaksi.hasOwnProperty(h_transaksi_id + "")) {
                    element += "<tr data-id='" + h_transaksi_id + "'>";

                    element += "<td>" + transaksi[h_transaksi_id + ""].date + "</td>";
                    element += "<td>" + h_transaksi_id + "</td>";
                    element += "<td>";

                    var item = transaksi[h_transaksi_id + ""].data;
                    var iLength = item.length;
                    for (var i = 0; i < iLength; i++) {
                        if (i > 0) {
                            element += "<br />";
                        }
                        element += item[i].menu_nama;
                    }
                    element += "</td>";

                    element += "<td>";
                    for (var i = 0; i < iLength; i++) {
                        if (i > 0) {
                            element += "<br />";
                        }
                        element += addThousandSeparator(item[i].menu_harga + "");
                    }
                    element += "</td>";

                    element += "<td>";
                    for (var i = 0; i < iLength; i++) {
                        if (i > 0) {
                            element += "<br />";
                        }
                        element += item[i].menu_qty;
                    }
                    element += "</td>";

                    element += "<td>";
                    for (var i = 0; i < iLength; i++) {
                        if (i > 0) {
                            element += "<br />";
                        }
                        element += addThousandSeparator(item[i].menu_subtotal + "");
                        grand_total += parseInt(item[i].menu_subtotal);
                    }
                    element += "</td>";

                    element += "</tr>";
                }
            }

            $(".table-transaksi tbody").html(element);
            $(".grand-total-value").html(addThousandSeparator(grand_total + ""));
        }
    });
}