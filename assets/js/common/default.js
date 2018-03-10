var maxTabIndex = 0;
$(function() {
    $("[tabindex='1']").focus();
    maxTabIndex = $("[tabindex]").length;

    $(window).on("keydown", function(e) {
        switch (e.which) {
            case 9:
            case 39:
                nextTabIndex(e);
                break;
            case 37:
                prevTabIndex(e);
                break;
        }
    });

    $(document).on("keydown", "input[data-type='number']", function(e) {
        isNumber(e);
    });

    $(document).on("input", "input[data-thousand-separator='true']", function() {
        this.value = addCommas(this.value);
    });
});

function nextTabIndex(e) {
    var activeElement = $(document.activeElement);
    if (activeElement.length > 0) {
        e.preventDefault();
        var tabIndex = activeElement.attr("tabindex");
        tabIndex++;
        if (tabIndex > maxTabIndex) {
            tabIndex = 1;
        }
        $("[tabindex='" + tabIndex + "']").focus();
    }
}

function prevTabIndex(e) {
    var activeElement = $(document.activeElement);
    if (activeElement.length > 0) {
        e.preventDefault();
        var tabIndex = activeElement.attr("tabindex");
        tabIndex--;
        if (tabIndex <= 0) {
            tabIndex = maxTabIndex;
        }
        $("[tabindex='" + tabIndex + "']").focus();
    }
}

function isNumber(e) {
	if (e.key.length == 1) {
		if ("0123456789".indexOf(e.key) < 0) {
			e.preventDefault();
		}
	}
}

function addCommas(nStr) {
    nStr = nStr.replace(/,/g, "");
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
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