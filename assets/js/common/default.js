var maxTabIndex = 0;
$(function() {
    $(":not(.tabindex-exception)[tabindex='1']").focus().addClass("active-element");
    maxTabIndex = $("[tabindex]:not(.tabindex-exception)").length;
    $("*").on("focus", function() {
        $("*").removeClass("active-element");
        $(this).addClass("active-element");
    });

    $(".menu-icon").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(".menu-container").hasClass("show")) {
            hide_menu();
        } else {
            show_menu();
        }
    });

    $(".menu").on("click", function(e) {
        e.stopPropagation();
        hide_menu();
    });

    $(window).on("keydown", function(e) {
        switch (e.which) {
            case 40: // DOWN
                if ($("body.option-container-show").length > 0) {
                    nextOptionActive();
                    e.preventDefault();
                } else {
                    if ($(".select.active-element").length > 0) {
                        showOptionContainer($(".select.active-element"));
                    } else if ($(".select-text.active-element").length > 0) {
                        showOptionContainer($(".select-text.active-element").parent());
                    }
                }
                break;
            case 38: // UP
                if ($("body.option-container-show").length > 0) {
                    prevOptionActive();
                    e.preventDefault();
                } else {
                    var activeElement = $(".select.active-element");
                    if (activeElement.length > 0) {
                        showOptionContainer(activeElement);
                    }
                }
                break;
            case 27: // ESC
                hideOptionContainer();
                closeDialog();
                break;
        }
    });

    $(window).on("keydown", window_keydown_tab);
    $(window).on("keydown", window_keydown_left);
    $(window).on("keydown", window_keydown_right);

    $(document).on("keydown", ".select-text", function(e) {
        if (e.which == 13) {
            e.preventDefault();
            e.stopPropagation();
            selectOption($(this).parent().find(".option.active"));
        }
    });

    $(document).on("click", ".select", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!$(this).find(".option-container").hasClass("show")) {
            showOptionContainer($(this));
        } else {
            hideOptionContainer($(this));
        }
    });

    $(document).on("click", ".option", function(e) {
        e.preventDefault();
        e.stopPropagation();
        selectOption($(this));
    });

    $(document).on("click", function(e) {
        hideOptionContainer();
    });

    $(document).on("keydown", "input[data-type='number']", function(e) {
        isNumber(e);
    });

    $(document).on("input", "input[data-type='number'][data-thousand-separator='true']", function(e) {
        var value = parseInt(removeThousandSeparator($(this).val()));
        if (isNaN(value)) {
            value = 0;
        }
        $(this).val(addThousandSeparator(value + ""));
    });

    $(document).on("click", ".dialog-close-icon, .btn-cancel", function() {
        var dialogElement = $(this).closest(".dialog");
        closeDialog(dialogElement);
    });

    $(document).on("click", function(e) {
        hide_menu();
    });
});

function show_menu() {
    $(".menu-container").addClass("show");
}

function hide_menu() {
    $(".menu-container").removeClass("show");
}

function window_keydown_tab(e) {
    if (e.which == 9) {
        nextTabIndex(e);
    }
}

function window_keydown_right(e) {
    if (e.which == 39) {
        if ($("body.option-container-show").length == 0 && $(".select-text.active-element").length == 0 && $(document.activeElement).prop("tagName").toLowerCase() != "input") {
            nextTabIndex(e);
        }
    }
}

function window_keydown_left(e) {
    if (e.which == 37) {
        if ($("body.option-container-show").length == 0 && $(".select-text.active-element").length == 0 && $(document.activeElement).prop("tagName").toLowerCase() != "input") {
            prevTabIndex(e);
        }
    }
}

function showDialog(dialogElement) {
    dialogElement.addClass("show");
    dialogElement.trigger("dialogShown");
}

function closeDialog(element) {
    if (element == null) {
        element = $(".dialog");
    }
    element.removeClass("show");
    element.trigger("dialogClosed");
}

function removeAllErrors() {
    $(".error").html("");
}

function showNotification(text) {
    var notification = $(".notification");
    notification.html(text);
    notification.off("webkitAnimationEnd oanimationend msAnimationEnd animationend");
    notification.one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
        notification.removeClass("showing");
    });

    notification.removeClass("showing");
    setTimeout(function() {
        notification.addClass("showing");
    }, 1);
}

function showOptionContainer(element) {
    element.find(".option-container").addClass("show");
    var value = element.attr("data-value");
    setOptionActive(element, value);
    $("body").addClass("option-container-show");
    element.find(".select-text").select();
}

function hideOptionContainer(element) {
    if (element != null) {
        element.find(".option-container").removeClass("show");
    } else {
        $(".option-container").removeClass("show");
    }
    $(".option").removeClass("active");
    $("body").removeClass("option-container-show");
}

function toggleOptionContainer(element) {
    if (element.find(".option-container.show").length == 0) {
        showOptionContainer(element);
    } else {
        hideOptionContainer(element);
    }
}

function setOptionActive(select, value) {
    $(".option.active").removeClass("active");
    select.find(".option[data-value='" + value + "']").addClass("active").focus();
    select.find(".select-text").focus();
}

function nextOptionActive() {
    var next = $(".option.active").next();
    if (next.length == 0) {
        next = $(".option.active").parent().children().first();
    }
    $(".option").removeClass("active");
    next.addClass("active").focus();
    next.closest(".select").find(".select-text").focus();
}

function prevOptionActive() {
    var prev = $(".option.active").prev();
    if (prev.length == 0) {
        prev = $(".option.active").parent().children().last();
    }
    $(".option").removeClass("active");
    prev.focus().addClass("active");
    prev.closest(".select").find(".select-text").focus();
}

function selectOption(option) {
    var value = option.attr("data-value");
    var text = option.html();
    var select = option.closest(".select");
    select.attr("data-value", value);
    var selectText = select.find(".select-text");
    if (selectText.prop("tagName").toLowerCase() == "input") {
        selectText.val(text);
    } else {
        selectText.html(text);
    }
    select.trigger("valueSelected");
    hideOptionContainer();
}

function nextTabIndex(e) {
    var activeElement = $(".active-element");
    var tabIndex = 0;
    if (activeElement.length > 0 && activeElement.prop("tagName").toLowerCase() != "body") {
        if (activeElement.hasClass("select-text")) {
            tabIndex = activeElement.closest(".select").attr("tabindex");
        } else {
            tabIndex = activeElement.attr("tabindex");
        }
    }
    hideOptionContainer();
    e.preventDefault();
    e.stopPropagation();
    
    tabIndex++;
    if (tabIndex > maxTabIndex) {
        tabIndex = 1;
    }
    $(":not(.tabindex-exception)[tabindex='" + tabIndex + "']").focus();
}

function prevTabIndex(e) {
    var activeElement = $(".active-element");
    if (activeElement.length > 0 && activeElement.prop("tagName").toLowerCase() != "body") {
        hideOptionContainer();
        e.preventDefault();
        e.stopPropagation();
        var tabIndex = activeElement.attr("tabindex");
        tabIndex--;
        if (tabIndex <= 0) {
            tabIndex = maxTabIndex;
        }
        $(":not(.tabindex-exception)[tabindex='" + tabIndex + "']").focus();
    }
}

function focusTabIndex(index) {
    $("[tabindex='" + index + "']").focus();
}

function isNumber(e) {
	if (e.key.length == 1) {
		if ("0123456789".indexOf(e.key) < 0) {
			e.preventDefault();
		}
	}
}

function addThousandSeparator(nStr) {
    nStr = nStr.replace(/,/g, "");
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function removeThousandSeparator(str) {
    return str.replace(/\./g,'');
}

function pad(pad, str, padLeft) {
    if (typeof str === 'undefined') 
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

function ajaxCall(url, data, callback) {
	return $.ajax({
		url: url,
		data: data,
		type: 'POST',
		error: function(jqXHR, exception) {
			if (exception != "abort") {
				console.log(jqXHR + " : " + jqXHR.responseText);
			}
		},
		success: function(result) {
			callback(result);
		}
	});
}

function checkInputNumber(element) {
    var value = parseInt($(element).val());
    if (value <= 0 || isNaN(value)) {
        $(element).val(1);
    } else if (value > 999) {
        $(element).val(999);
    }
}