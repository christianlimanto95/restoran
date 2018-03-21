var get_all_menu_ajax = null;

$(function() {
    $(document).on("keydown click", ".qty-add", function(e) {
        if ((e.type == "keydown" && e.which == 13) || e.type == "click") {
            add_to_table();
            initialize();
        }
    });

    $(window).on("keydown", function(e) {
        switch (e.which) {
            case 13:
                nextTabIndex(e);
                break;
            case 112:
                e.preventDefault();
                toggleOptionContainer($(".menu-chosen"));
                break;
        }
    });

    $(window).on("keyup", function(e) {
        if ($(document.activeElement).prop("tagName").toLowerCase() != "input") {
            if (e.which == 66) {
                showDialogBayar();
            }
        }
    });

    $(document).on("click", ".option", function(e) {
        nextTabIndex(e);
    });

    $(".menu-chosen-text").on("input", function() {
        get_all_menu();
    });

    $(".select-text").on("keydown", function(e) {
        if (e.which == 9 || e.which == 13) {
            var optionActive = $(".option.active");
            var nama = optionActive.attr("data-nama");
            var harga = removeThousandSeparator(optionActive.attr("data-harga"));
            $(".select").attr("data-nama", nama);
            $(".select").attr("data-harga", harga);
            selectOption($(".option.active"));
            nextTabIndex(e);
            just_get_all_menu();
        }
    });

    $(".select").on("valueSelected", function() {
        var id = $(this).attr("data-value");
        var selectedOption = $(".option[data-value='" + id + "']");
        var nama = selectedOption.attr("data-nama");
        var harga = removeThousandSeparator(selectedOption.attr("data-harga"));
        $(this).attr("data-nama", nama);
        $(this).attr("data-harga", harga);
    });

    $(document).on("click", ".btn-cancel-menu", function() {
        var tr = $(this).closest("tr");
        deleteItem(tr);
    });

    $(".bayar").on("click", function() {
        showDialogBayar();
    });

    $(".dialog-bayar").on("dialogShown", function() {
        $(".input-bayar").select();
    });

    $(".input-bayar").on("input", function() {
        var value = parseInt(removeThousandSeparator($(this).val()));
        if (isNaN(value)) {
            value = 0;
        }
        value = addThousandSeparator(value + "");
        $(this).val(value);
    });

    $(".input-bayar").on("keydown", function(e) {
        if (e.which == 13) {
            e.stopPropagation();
            showConfirmDialogBayar();
        }
    });

    $(".btn-bayar").on("click", function() {
        showConfirmDialogBayar();
    });

    $(".btn-confirm-bayar").on("click", function() {
        do_transaksi();
    });

    get_all_menu(true);
});

function script1onload() {

}

function script2onload() {

}

function script3onload() {
	
}

function do_transaksi() {
    var menu_array = [];
    var total = 0;
    var menu = "";
    $(".detail-table tbody tr").each(function() {
        var menu_id = $(this).attr("data-id");
        var nama = $(this).attr("data-nama");
        var qty = $(this).attr("data-qty");
        var subtotal = $(this).attr("data-subtotal");

        if (menu != "") {
            menu += ";";
        }
        menu += menu_id + "~" + qty;
        menu_array.push(pad('   ', qty, true) + ' ' + pad('                    ', nama, false) + ' ' + pad('       ', subtotal, true) + '\x0A');

        total += parseInt(subtotal);
    });

    ajaxCall(do_transaksi_url, {menu: menu}, function(json) {
        var result = jQuery.parseJSON(json);
        var h_transaksi_id = result.h_transaksi_id;

        var d = new Date();
        var day = d.getDate() + '';
        var month = (d.getMonth() + 1) + '';
        var year = d.getFullYear() + '';
        var date = pad('00', day, true) + '-' + pad('00', month, true) + '-' + year;

        var hour = d.getHours() + '';
        var min = d.getMinutes() + '';
        var sec = d.getSeconds() + '';
        var time = pad('00', hour, true) + ':' + pad('00', min, true) + ':' + pad('00', sec, true);

        var grandtotal = removeThousandSeparator($(".subtotal").attr("data-value"));
        var bayar = removeThousandSeparator($(".dialog-confirm-bayar-bayar").html());
        var kembali = removeThousandSeparator($(".dialog-confirm-bayar-kembali").html());

        var args = {
            h_transaksi_id: h_transaksi_id,
            date: date,
            time: time,
            total: total,
            grandtotal: grandtotal,
            bayar: bayar,
            kembali: kembali,
            menu_array: menu_array
        };

        if (qz.websocket.isActive()) {
            qz.printers.find("pos58 printer(4)").then(function(printer) {
                print(printer, args);
            });
        } else {
            qz.websocket.connect().then(function() { 
                return qz.printers.find("pos58 printer(4)"); // Pass the printer name into the next Promise
            }).then(function(printer) {
                print(printer, args);
            }).catch(function(e) { console.error(e); });
        }
        
        closeDialog();
        showNotification("Transaksi Berhasil");
        $(".subtotal").attr("data-value", "0");
        $(".subtotal").html("0");
        initialize();
        $(".detail-table tbody").html("");
    });
}

function print(printer, args) {
    var config = qz.configs.create(printer);       // Create a default config for the found printer
    var data = [
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        'DAPUR BABI' + '\x0A',
        'Spesialis Mie Babi dan Kwetiau' + '\x0A',
        'Telp : 031-1234567',     
        '\x0A',
        '\x0A',
        'TAX INVOICE' + '\x0A',    
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        'No. Nota #' + args.h_transaksi_id + '\x0A',
        args.date + '  ' + args.time + '\x0A' + '\x0A',
        'QTY ITEM                   TOTAL' + '\x0A'
    ];
    Array.prototype.push.apply(data, args.menu_array);
    Array.prototype.push.apply(data, [
        '\x0A',
        'TOTAL                    ' + pad('       ', args.total + '', true) + '\x0A',
        'TAX 10%                  ' + pad('       ', parseInt((args.total / 10)) + '', true) + '\x0A',
        '\x0A',
        '\x1B' + '\x45' + '\x0D', // bold on
        'GRAND TOTAL              ' + pad('       ', args.grandtotal, true) + '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        'BAYAR                    ' + pad('       ', args.bayar, true) + '\x0A',
        'KEMBALI                  ' + pad('       ', args.kembali, true) + '\x0A',
        '\x0A' + '\x0A',
        '--------------------------------' + '\x0A',
        '\x0A',
        '\x1B' + '\x61' + '\x31', // center align
        'Terima Kasih atas kunjungan Anda.',
        '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
        '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                            // **for legacy drawer cable CD-005A.  Research before using.
    ]);   // Raw ZPL
    return qz.print(config, data);
}

function initialize() {
    just_get_all_menu(true);
    selectOption($(".option").first());
    $(".qty").val(1);
}

function showDialogBayar() {
    var subtotal = parseInt($(".subtotal").attr("data-value"));
    if (subtotal == 0) {
        showNotification("Pesanan Belum Diinputkan");
    } else {
        var dialogBayar = $(".dialog-bayar");
        dialogBayar.attr("data-total", subtotal);
        $(".dialog-bayar-total").html(addThousandSeparator(subtotal + ""));
        $(".input-bayar").val(0);
        showDialog(dialogBayar);
    }
}

function showConfirmDialogBayar() {
    var total = parseInt($(".dialog-bayar").attr("data-total"));
    var bayar = parseInt(removeThousandSeparator($(".input-bayar").val()));
    if (bayar < total) {
        showNotification("Uang Tidak Cukup");
        $(".input-bayar").select();
    } else {
        var dialogConfirmBayar = $(".dialog-confirm-bayar");
        dialogConfirmBayar.attr("data-total", total);
        dialogConfirmBayar.attr("data-bayar", bayar);
        var kembali = bayar - total;
        $(".dialog-confirm-bayar-total").html(addThousandSeparator(total + ""));
        $(".dialog-confirm-bayar-bayar").html(addThousandSeparator(bayar + ""));
        $(".dialog-confirm-bayar-kembali").html(addThousandSeparator(kembali + ""));
        showDialog(dialogConfirmBayar);
    }
}

function get_all_menu(first) {
    var value = $(".menu-chosen-text").val().trim();
    if (get_all_menu_ajax != null) {
        get_all_menu_ajax.abort();
    }
    get_all_menu_ajax = ajaxCall(get_all_menu_url, {keyword: value}, function(json) {

        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<div class='menu-option option tabindex-exception' data-value='" + data[i].menu_id + "' tabindex='" + (i + 1) + "' data-nama='" + data[i].menu_nama + "' data-harga='" + data[i].menu_harga + "'>" + data[i].menu_id + " - " + data[i].menu_nama + " - " + data[i].menu_harga + "</div>";
        }
        $(".menu-option-container").html(element);
        if (first) {
            var optionFirst = $(".option").first();
            var nama = optionFirst.attr("data-nama");
            var harga = optionFirst.attr("data-harga").replace(".", "");
            $(".select").attr("data-nama", nama);
            $(".select").attr("data-harga", harga);
            selectOption(optionFirst);
        } else {
            $(".menu-chosen .option-container").addClass("show");
            $("body").addClass("option-container-show");
        }

        if (iLength > 0) {
            setOptionActive($(".select"), data[0].menu_id);
        }
    });
}

function just_get_all_menu() {
    if (get_all_menu_ajax != null) {
        get_all_menu_ajax.abort();
    }
    get_all_menu_ajax = ajaxCall(get_all_menu_url, {keyword: ""}, function(json) {

        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<div class='menu-option option tabindex-exception' data-value='" + data[i].menu_id + "' data-nama='" + data[i].menu_nama + "' data-harga='" + data[i].menu_harga + "' tabindex='" + (i + 1) + "'>" + data[i].menu_id + " - " + data[i].menu_nama + " - " + data[i].menu_harga + "</div>";
        }
        $(".menu-option-container").html(element);
    });
}

function add_to_table() {
    var id = $(".select").attr("data-value");
    var nama = $(".select").attr("data-nama");
    var harga = parseInt($(".select").attr("data-harga"));
    var qty = parseInt($(".qty").val());
    var subtotal = qty * harga;

    var tbodyTR = $(".detail-table tbody tr");
    var iLength = tbodyTR.length;
    for (var i = 0; i < iLength; i++) {
        if (tbodyTR[i].getAttribute("data-id") == id) {
            var tdQty = $(tbodyTR[i]).find("td:nth-child(4)");
            var currentQty = parseInt(tdQty.html());
            currentQty += qty;
            $(tbodyTR[i]).attr("data-qty", currentQty);
            tdQty.html(currentQty);
            
            var tdSubtotal = $(tbodyTR[i]).find("td:nth-child(5)");
            var currentSubtotal = parseInt(tdSubtotal.html().replace(".", ""));
            currentSubtotal += subtotal;
            tdSubtotal.html(addThousandSeparator(currentSubtotal + ""));

            $(tbodyTR[i]).attr("data-subtotal", currentSubtotal);
            setTotal();
            return;
        }
    }

    var element = "";
    element += "<tr data-id='" + id + "' data-nama='" + nama + "' data-subtotal='" + subtotal + "' data-qty='" + qty + "'>";
    element += "<td>" + id + "</td>";
    element += "<td>" + nama + "</td>";
    element += "<td>" + addThousandSeparator(harga + "") + "</td>";
    element += "<td>" + qty + "</td>";
    element += "<td>" + addThousandSeparator(subtotal + "") + "</td>";
    element += "<td><div class='btn-cancel-menu'>CANCEL</div></td>";
    element += "</tr>";
    $(".detail-table tbody").append(element);

    setTotal();
}

function setTotal() {
    var total = 0;
    var tr = $(".detail-table tbody tr");
    tr.each(function() {
        total += parseInt($(this).attr("data-subtotal"));
    });

    total += total / 10;
    $(".subtotal").attr("data-value", total);
    $(".subtotal").html(addThousandSeparator(total + ""));
}

function deleteItem(tr) {
    var subtotal = parseInt(tr.attr("data-subtotal"));
    tr.remove();
    setTotal();
}