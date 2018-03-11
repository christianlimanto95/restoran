$(function() {
    $(window).on("keydown", function(e) {
        switch (e.which) {
            case 13:
                nextTabIndex(e);
                break;
        }
    });

    get_all_menu();
});

function get_all_menu() {
    ajaxCall(get_all_menu_url, null, function(json) {
        var result = jQuery.parseJSON(json);
    });
}