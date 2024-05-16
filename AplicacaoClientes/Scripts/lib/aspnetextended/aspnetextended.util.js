var Util = new function () {

	this.getQueryStringHashValues = function (hashParameterName, tryQueryStringIfNotFound) {
		hashParameterName = hashParameterName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?#]" + hashParameterName + "=([^&]*)"),
            results = regex.exec(location.hash);

		return results == null ? (tryQueryStringIfNotFound ? this.getQueryString(hashParameterName) : "") : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	this.getQueryString = function (name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	this.redirectToUrl = function (url) {
		this.showWaitLoad();
		window.location.href = url;
	}

	this.showWaitLoad = function () {
		$("#loadingDiv").show();
	}

	this.hideWaitLoad = function () {
	    $("#loadingDiv").hide();
	}

	this.mergeArrays = function () {
		var args = arguments;
		var hash = {};
		var arr = [];
		for (var i = 0; i < args.length; i++) {
			for (var j = 0; j < args[i].length; j++) {
				if (hash[args[i][j]] !== true) {
					arr[arr.length] = args[i][j];
					hash[args[i][j]] = true;
				}
			}
		}
		return arr;
	}

	this.htmlEncode = function (value) {
		//create a in-memory div, set it's inner text(which jQuery automatically encodes)
		//then grab the encoded contents back out.  The div never exists on the page.
		return $('<div/>').text(value).html();
	}

	this.htmlDecode = function (value) {
		return $('<div/>').html(value).text();
	}

	this.applyIntegerInputMask = function (seletor, aceitaNegativo, qtdDigitos) {
		$(seletor).inputmask("integer", {
			integerDigits: qtdDigitos,
			autoGroup: true,
			groupSeparator: ".",
			groupSize: 3,
			allowMinus: aceitaNegativo,
			clearMaskOnLostFocus: false
		});
	}

	this.applyDecimalInputMask = function (seletor, aceitaNegativo, qtdDigitosInteiros, qtdCasasDecimais) {
		$(seletor).inputmask("decimal", {
			integerDigits: qtdDigitosInteiros,
			autoGroup: true,
			groupSeparator: ".",
			radixPoint: ",",
			groupSize: 3,
			digits: qtdCasasDecimais,
			allowMinus: aceitaNegativo,
			clearMaskOnLostFocus: false
		});
	}

	/* Scrolltop para alerts de Sucesso e Erro */
	this.scrollTop = function () {
		$("#focoScroll").focus();
		setTimeout(function () {
			$("#focoScroll").focus();
			$("#focoScroll").blur();
		}, 500);
	};
	$(document).ready(function () {
		$("#focoScroll").focus(function () {
			setTimeout(function () {
				$("#focoScroll").blur();
			}, 500);
		});
    });

    this.readAttr = function (name, el) {
        var val = $(el).attr(name);
        $(el).removeAttr(name);
        return val;
    };

    $.fn.serializeAllObject = function () {
        var obj = {};

        $('input:not(input[type="radio"]),textarea', this).each(function () {
            obj[this.name] = $(this).val();
        });

        $('input[type="radio"]', this).each(function () {
            if ($(this).is(":checked")) {
                obj[this.name] = $(this).val();
            }
        });

        $('select', this).each(function () {
            obj[this.name] = $(this).val();
        });

        $('input[type="checkbox"]', this).each(function () {
            obj[this.name] = $(this).is(":checked") ? true : false;
        });

        delete obj[""];

        return obj;
    }

};


//-----Customizações do jquery

//fazendo o show funcionar com o bootstrap
(function ($) {
	var show = $.fn.show;
	return $.fn.show = function () {
		this.removeClass("hidden hide");
		return show.apply(this, arguments);
	};
})(jQuery);

//Atalho para a função de formatação


//Redefinindo o serialize para remover os itens que não tem valor
(function ($) {
	//var serialize = $.fn.serialize;
	return $.fn.serialize = function () {
		return $.map(this.serializeArray(), function (n) {
			if (n.value) {
				return n.name + "=" + n.value;
			}
			return null;
		}).join("&");
	};
})(jQuery);

(function ($) {
	return $.fn.treeView = function () {
		$(this).find('li:has(ul)')
               .addClass('parent_li')
               .find(' > span')
               .addClass('glyphicon-minus');

		$(this).find('li.parent_li > span').on('click', function (e) {
			var children = $(this).parent('li.parent_li')
                                  .find(' > ul');
			children.toggle('slide', { direction: 'up' }, 'fast');
			$(this).toggleClass('glyphicon-minus glyphicon-plus');

			e.stopPropagation();
		});
		return this;
	};
})(jQuery);
