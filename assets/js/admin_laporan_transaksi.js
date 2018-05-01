var laporanDone = false;

function script1onload() {
    $(".input-date-start").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function() {
            var dateEnd = $(".input-date-end").val();
            if (dateEnd != "") {
                get_laporan_transaksi();
            }
        }
    });

    $(".input-date-end").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function() {
            var dateStart = $(".input-date-start").val();
            if (dateStart != "") {
                get_laporan_transaksi();
            }
        }
    });

    $(".export-to-excel").on("click", function() {
        if (!laporanDone) {
            showNotification("Pilih tanggal DARI dan SAMPAI");
        } else {
            exportToExcel();
        }
    });
}

function exportToExcel() {
    var ws_data = [];
    var judul = "Laporan Transaksi Periode " + $(".input-date-start").val() + " sampai " + $(".input-date-end").val();
    ws_data.push([judul]);
    ws_data.push([""]);
    ws_data.push(["TANGGAL", "NO. NOTA", "MENU", "HARGA", "JUMLAH", "DISKON", "SUBTOTAL"]);

    var tr = $(".table-transaksi tbody tr");
    var iLength = tr.length;
    for (var i = 0; i < iLength; i++) {
        var currentTr = $(tr[i]);
        var tgl = currentTr.find("td:nth-child(1)").html();
        var nota = currentTr.find("td:nth-child(2)").html();
        var menu = currentTr.find("td:nth-child(3)").html();
        var harga = currentTr.find("td:nth-child(4)").html();
        var jumlah = currentTr.find("td:nth-child(5)").html();
        var diskon = currentTr.find("td:nth-child(6)").html();
        var subtotal = currentTr.find("td:nth-child(7)").html();

        menu = menu.split("<br>");
        var currentMenu = menu[0];
        harga = harga.split("<br>");
        var currentHarga = harga[0];
        jumlah = jumlah.split("<br>");
        var currentJumlah = jumlah[0];
        diskon = diskon.split("<br>");
        var currentDiskon = diskon[0];
        subtotal = subtotal.split("<br>");
        var currentSubtotal = subtotal[0];
        
        ws_data.push([tgl, nota, currentMenu, currentHarga, currentJumlah, currentDiskon, currentSubtotal]);

        var menuLength = menu.length;
        for (var j = 1; j < menuLength; j++) {
            ws_data.push(["", "", menu[j], harga[j], jumlah[j], diskon[j], subtotal[j]]);
        }
    }

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, judul + ".xlsx");
}

function script2onload() {

}

function get_laporan_transaksi() {
    var start_date = $(".input-date-start").val();
    var end_date = $(".input-date-end").val();
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
                        diskon_nominal: data[i].diskon_nominal,
                        diskon_satuan: data[i].diskon_satuan,
                        menu_subtotal: data[i].menu_subtotal
                    });
                } else {
                    transaksi[data[i].h_transaksi_id + ""] = {
                        date: data[i].created_date,
                        data: [{
                            menu_id: data[i].menu_id,
                            menu_nama: data[i].menu_nama,
                            menu_harga: data[i].menu_harga,
                            menu_qty: data[i].menu_qty,
                            diskon_nominal: data[i].diskon_nominal,
                            diskon_satuan: data[i].diskon_satuan,
                            menu_subtotal: data[i].menu_subtotal
                        }]
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
                        var diskon_nominal = item[i].diskon_nominal;
                        var diskon_satuan = item[i].diskon_satuan;
                        var diskon = diskon_nominal;
                        if (diskon != 0) {
                            if (diskon_satuan == "1") {
                                diskon = "-" + addThousandSeparator(diskon_nominal);
                            } else {
                                diskon = "-" + diskon_nominal + "%";
                            }
                        }

                        if (i > 0) {
                            element += "<br />";
                        }
                        element += diskon;
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
            showNotification("Result Updated");
            laporanDone = true;
        }
    });
}