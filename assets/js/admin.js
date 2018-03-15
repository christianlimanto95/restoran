$(function() {
    $(".main-menu").on("mouseenter", function() {
        var tabIndex = $(this).prop("tabIndex");
        focusTabIndex(tabIndex);
    });
});