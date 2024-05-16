$(document).ready(function () {
    $.ajaxSetup({
        cache: false,
        error: function () {
            if (window.customErrorsOn) {
                window.location = window.urlError;
            }
        }
    });

    criarValidadoresCustomizados();
    configurarLoadingSubmit();
    configurarInputsData();
});

function configurarInputsData() {
    //$('.inputData').datetimepicker({
    //    lang: 'pt',
    //    timepicker: false,
    //    format: 'd/m/Y',
    //    formatDate: 'd/m/Y'
    //});
    //$('.inputHora').datetimepicker({
    //    datepicker: false,
    //    format: 'H:i',
    //    step: 5
    //});
    $(".inputHora").attr('maxlength', '5');
    $(".inputData").attr('maxlength', '10');

    $(".inputHora").each(function () {
        $(this).val($(this).val().substr(0, 5));
    });

    $(".inputData").each(function () {
        $(this).val($(this).val().substr(0, 10));
    });
}

function configureMultipleSubmitButtons() {
    //Responsável por detectar o click em botoes submits e redefinir a 
    $(":submit").on("click", function () {
        var redefAction = $(this).data("action") || $(this).attr("action");
        if (redefAction) {
            $(this).closest("form").attr("action", redefAction);
        }
    });
}

/*
$(document).bind("ajaxSend", function (event, xhr, settings) {
    window.setTimeout(function () {
        if (!xhr.completed &&
                !(settings.url.indexOf("_search=") >= 0 || settings.url.indexOf("sidx=") >= 0) //Evitar mostrar tela de load no caso do jqgrid
            ) {
            Util.showWaitLoad();
        }
    }, 1500); //Tempo em milis de espera antes de mostrar a tela de loading, se qualquer chamada ajax demorar mais que isso a tela é bloqueada
}).bind("ajaxComplete", function (event, xhr, settings) {
    $('input[type="submit"]:disabled').each(function () {
        if ($(this).attr('double-submit-disabled')) {
            $(this).removeAttr("disabled")
                   .removeAttr("double-submit-disabled");
        }
    });
    xhr.completed = true;
    $(".load_processo").hide();
});
*/

// Efeito loading
function configurarLoadingSubmit() {
    // Comentei temporariamente, mas a versão abaixo seria a mais correta, juntando conhecimento de blog e Pitang
    $("form").submit(function (e) {
        if ($(this).valid()) {
            Message.clearMessages();
            //Util.showWaitLoad();
        } else {
            $('.validation-summary-errors').show();
            e.preventDefault();
            return false;
        }
    });
    /*
    $("#loadingDiv").bind("ajaxSend", function () {
        $(this).show();
    }).bind("ajaxStop", function () {
        $(this).hide();
    }).bind("ajaxError", function () {
        $(this).hide();
    });*/
}
//-- FIM efeito loading


// Funções geral que seriam executadas por todos os forms Mvc Ajax
function customOnBeginAjaxMvcForm() {
    console.log("Executei customOnBeginAjaxMvcForm() ..");
}
function customOnCompleteAjaxMvcForm() {
    console.log("Executei customOnCompleteAjaxMvcForm() ...");
}
function customOnFailureAjaxMvcForm() {
    console.log("Executei customOnFailureAjaxMvcForm() ...");
}
function customOnSuccessAjaxMvcForm() {
    console.log("Executei customOnSuccessAjaxMvcForm() ...");
}
//--FIM


/*Adicionar novos validadors*/
function criarValidadoresCustomizados() {
    $.extend($.validator.methods, {
        date: function (value, element) {
            return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
        },
        number: function (value, element) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
        },
        range: function (value, element, param) {
            var val = value.replace(",", "#").replace(".", ",").replace("#", ".");
            return this.optional(element) || (val >= param[0] && val <= param[1]);
        }
    });

    $.validator.unobtrusive.adapters.add('comparedates', ['propertyname', 'typecompare'],
        function (options) {
            options.rules['comparedates'] = options.params;
            if (options.message) {
                options.messages['comparedates'] = options.message;
            }
        }
    );

    $.validator.addMethod('comparedates', function (value, element, params) {
        var otherFieldValue = $('input[name="' + params.propertyname + '"]').val();

        if (otherFieldValue && value) {

            var currentValue = Date.parse(value);
            var otherValue = Date.parse(otherFieldValue);

            if ((params.typecompare == "Maior" && !(currentValue > otherValue))
                || (params.typecompare == "Menor" && !(currentValue < otherValue))
                || (params.typecompare == "MaiorIgual" && !(currentValue >= otherValue))
                || (params.typecompare == "MenorIgual" && !(currentValue <= otherValue))
                || (params.typecompare == "Igual" && !(currentValue == otherValue))) {
                return false;
            }
        }

        customValidation.addDependatControlValidaitonHandler(element, params.propertyname);

        return true;
    }, '');
}

$.ajaxPrefilter(function (opts, originalOptions, xhr) {
    var originalSuccess = opts.success;
    opts.success = function () {
        var args = [].slice.call(arguments);
        var propagarSucesso = handleAjaxMessages.apply(this, args);
        if (propagarSucesso && originalSuccess) {
            originalSuccess.apply(this, args); // Fire original with the right scope and arguments
        }
    };
});

function handleAjaxMessages(data, status, xhr) {
    var msgType = xhr.getResponseHeader('X-Message-Type');
    var propagate = true;
    var showMessages = false;
    if (msgType) {
        if (msgType == "Error") {
            propagate = false;
            showMessages = true;
        } else if (msgType == "Success") {
            propagate = true;
            var redirectUrl = xhr.getResponseHeader('REDIRECT_LOCATION');
            var reloadLocation = xhr.getResponseHeader('RELOAD_LOCATION');

            if (redirectUrl || reloadLocation) {
                showMessages = false;
                if (reloadLocation) {
                    Util.showWaitLoad();
                    window.location = document.URL.replace(/#$/, '');
                    Util.scrollTop();
                } else if (redirectUrl) {
                    Util.redirectToUrl(redirectUrl);
                    Util.scrollTop();
                }
            } else {
                showMessages = true;
            }
        }
        if (showMessages) {
            var resultado = JSON.parse(xhr.responseText);
            Message.displayMessages(resultado, msgType);
        }
    }

    return propagate;
}

function limparMultiSelect(multselect, inserirSelecione) {
    $(multselect).empty();
    if (inserirSelecione) {
        $(multselect).append("<option value='' selected='selected'>Selecione</option>");
    }
}

function popularMultiSelectPorId(idSelect, collection, inserirSelecione) {
    var seletor = "#" + idSelect;
    var multselect = $(seletor);
    popularMultiSelect(multselect, collection, inserirSelecione);
}

function popularMultiSelect(multselect, collection, inserirSelecione) {
    limparMultiSelect(multselect, inserirSelecione);
    $.each(collection, function (index, data) {
        $(multselect).append("<option value='" + data.Chave + "' title='" + data.Descricao + "'>" + data.Descricao + "</option>");
    });
}

function toolTipItens(element) {
    $(element + " option").each(function (i) {
        this.title = this.text;
    });
}

function serializeSelectOptions(idSelect, idHidden) {
    var itens = [];
    var seletorSelect = "#" + idSelect + " option";
    var seletorHidden = "#" + idHidden;
    $(seletorSelect).each(function (i, e) {
        itens.push($(e).val());
    });
    var serialized = $(seletorSelect).length > 0 ? JSON.stringify(itens) : '';
    $(seletorHidden).val(serialized);
}

function moverOption(idFrom, idTo) {
    var seletorPara = '#' + idTo;
    var seletorDe = "#" + idFrom + " option:selected";

    $(seletorDe).each(function (i, e) {
        $(seletorPara).append($(e).clone());
        $(e).remove();
    });
    sortSelect($(seletorPara));
}

function sortSelect(element) {
    var option = $.makeArray(element.prop('options'));
    var sortOptions = option.sort(function (a, b) {
        return a.text < b.text ? -1 : 1;
    });
    element.empty().html(sortOptions);
}

