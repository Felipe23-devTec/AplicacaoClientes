var Dialog = new function () {

    var resultCallback;

    //funções publicas
    this.show = function (title, contentOrOptionsToRemote, buttons, dialogSize, funcCallback) {
        dialogSize = dialogSize || this.DialogSizes.MEDIUM;

        $("#modalDialogBody").empty();
        $("#modalDialogTitle").empty().append(title + "<button type='button' class='close' data-dismiss='modal'>&times;</button>");
        if (typeof (contentOrOptionsToRemote) === "string" || contentOrOptionsToRemote instanceof jQuery) {
            $("#modalDialogBody").append(contentOrOptionsToRemote);
        } else if (typeof (contentOrOptionsToRemote) === "object" && contentOrOptionsToRemote.url) {
            $("#modalDialogBody").append("<i class='fa fa-spinner fa-pulse fa-2x' aria-hidden='true' style='color: #0069d9;text-align:center;display:inline-block;width:100%'></i>");
            $.ajax(contentOrOptionsToRemote).done(function (data) {
                $("#modalDialogBody").html(data);

                if (funcCallback) funcCallback.call();

            });
        }
        //processButtons(buttons, $("#modalDialogFooter").empty());
        $("#modalDialog .modal-dialog").removeClass('modal-sm modal-lg').addClass(dialogSize);
        $("#modalDialog").modal("show");
        return this;
    };

    this.toggle = function () {
        $("#modalDialog").modal('toggle');
    };

    this.done = function (funcResultCallback) {
        resultCallback = funcResultCallback;
    };

    //TODO tbb rever esse método
    this.confirm = function (title, mensagemConfirmacao, buttons, url, parametros, dialogSize) {
        dialogSize = dialogSize || this.DialogSizes.SMALL;

        $("#modalDialogTitle").empty().append(title);
        $("#modalDialogBody").empty().append(mensagemConfirmacao);

        if (!buttons) {
            buttons = criarButtonsConfirmacaoPadrao(url, parametros);
        }

        processButtons(buttons, $("#modalDialogFooter").empty());
        $("#modalDialog .modal-dialog").removeClass('modal-sm modal-lg').addClass(dialogSize);
        $("#modalDialog").modal("show");
        return this;
    };

    this.confirmBeforeSubmit = function (title, mensagemConfirmacao, formId, actionName, dialogSize) {
        dialogSize = dialogSize || this.DialogSizes.SMALL;

        $("#modalDialogTitle").empty().append(title);
        $("#modalDialogBody").empty().append(mensagemConfirmacao);

        var buttons = criarButtonsSubmitAposConfirmacao(formId, actionName);

        processButtons(buttons, $("#modalDialogFooter").empty());
        $("#modalDialog .modal-dialog").removeClass('modal-sm modal-lg').addClass(dialogSize);
        $("#modalDialog").modal("show");
        return this;
    };

    this.notify = function (data) {
        resultCallback && resultCallback(data);
    };

    this.DialogSizes = {
        SMALL: 'modal-sm',
        MEDIUM: '',
        LARGE: 'modal-lg',
        EXTRA_LARGE: 'modal-xl'
    };

    //funções privadas
    function processButtons(buttons, container) {
        if (buttons) {
            var typeOfButtons = typeof (buttons);
            // Comentado temporariamente no dia 19/12/2019
            /*if (typeOfButtons == "string" || buttons instanceof jQuery) {
                container.append(buttons);
            } else if (typeOfButtons == "object") {
                createAndAppendButtonsTo(buttons, container);
            }*/
            container.show();
        } else {
            container.hide();
        }
    }

    function createAndAppendButtonsTo(buttons, container) {
        for (var btnDef in buttons) {
            var btnValue = btnDef;
            btnDef = buttons[btnDef];

            var btnClasses = ["btn", "btn-default", "btn-sm"];
            if (btnDef.class) {
                btnClasses = Util.mergeArrays(btnClasses, btnDef.class.split(' '));
            }
            btnDef.class = btnClasses.join(" ");

            var btn = $("<button/>", btnDef).removeAttr("icon");


            if (btnDef.icon) {
                var icon = $("<span></span>");
                if (/glyphicon-/gim.test(btnDef.icon) && !/glyphicon\s+glyphicon-/gim.test(btnDef.icon)) {
                    icon.addClass("glyphicon");
                }
                icon.addClass(btnDef.icon)
					.appendTo(btn);
            }
            btn.append("&nbsp;" + btnValue);
            container.append(btn);
        }
    }

    function criarButtonsConfirmacaoPadrao(url, parametros) {
        var buttons = {
            "Confirmar": {
                icon: "glyphicon-ok",
                on: {
                    click: function () {
                        $.post(url, parametros, null, "json");
                    }
                },
                id: "btnConfirmar",
                class: "btn-success",
                "data-dismiss": "modal"
            },
            "Cancelar": {
                icon: "glyphicon-remove",
                id: "btnCancelar",
                "data-dismiss": "modal"
            }
        };

        return buttons;
    }

    function criarButtonsSubmitAposConfirmacao(formId, actionName) {
        var buttons = {
            "Confirmar": {
                icon: "glyphicon-ok",
                on: {
                    click: function () {
                        $("#" + formId).attr("action", actionName);
                        $("#" + formId).submit();
                    }
                },
                id: "btnConfirmar",
                class: "btn-success",
                "data-dismiss": "modal"
            },
            "Cancelar": {
                icon: "glyphicon-remove",
                id: "btnCancelar",
                "data-dismiss": "modal"
            }
        };
        return buttons;
    }

};





