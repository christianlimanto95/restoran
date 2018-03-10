$(function() {
    $(window).on("keydown", function(e) {
        switch (e.which) {
            case 13:
                nextTabIndex(e);
                break;
        }
    });
});