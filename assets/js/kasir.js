$(function() {
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

    get_all_menu();
});

function get_all_menu() {
    ajaxCall(get_all_menu_url, null, function(json) {
        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<div class='menu-option option tabindex-exception' data-value='" + data[i].menu_id + "' tabindex='" + (i + 1) + "'>" + data[i].menu_id + " - " + data[i].menu_nama + " - " + data[i].menu_harga + "</div>";
        }
        $(".menu-option-container").html(element);
        $(".menu-chosen-text").val(data[0].menu_id + " - " + data[0].menu_nama + " - " + data[0].menu_harga);
        $(".menu-chosen").attr("data-value", data[0].menu_id);
    });
}