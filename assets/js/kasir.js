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
            var harga = optionActive.attr("data-harga").replace(".", "");
            $(".select").attr("data-nama", nama);
            $(".select").attr("data-harga", harga);
            selectOption($(".option.active"));
            nextTabIndex(e);
            just_get_all_menu();
        }
    });

    $(document).on("click", ".btn-cancel", function() {
        var tr = $(this).closest("tr");
        deleteItem(tr);
    });

    get_all_menu(true);
});

function initialize() {
    just_get_all_menu(true);
    selectOption($(".option").first());
    $(".qty").val(1);
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
            tdQty.html(currentQty);
            
            var tdSubtotal = $(tbodyTR[i]).find("td:nth-child(5)");
            var currentSubtotal = parseInt(tdSubtotal.html());
            currentSubtotal += subtotal;
            tdSubtotal.html(addThousandSeparator(currentSubtotal + ""));

            $(tbodyTR[i]).attr("data-subtotal", currentSubtotal);
            addTotal(-subtotal);
            return;
        }
    }

    var element = "";
    element += "<tr data-id='" + id + "' data-subtotal='" + subtotal + "'>";
    element += "<td>" + id + "</td>";
    element += "<td>" + nama + "</td>";
    element += "<td>" + addThousandSeparator(harga + "") + "</td>";
    element += "<td>" + qty + "</td>";
    element += "<td>" + addThousandSeparator(subtotal + "") + "</td>";
    element += "<td><div class='btn-cancel'>CANCEL</div></td>";
    element += "</tr>";
    $(".detail-table tbody").append(element);

    addTotal(subtotal);
}

function addTotal(subtotal) {
    var total = parseInt($(".subtotal").attr("data-value"));
    total += subtotal;
    $(".subtotal").attr("data-value", total);
    $(".subtotal").html(addThousandSeparator(total + ""));
}

function deleteItem(tr) {
    var subtotal = parseInt(tr.attr("data-subtotal"));
    tr.remove();
    addTotal(-subtotal);
}