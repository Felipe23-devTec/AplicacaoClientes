var Message = new function () {
    this.MessageType =
    {
        SUCCESS: "Success",
        ERROR: "Error",
        ALERT: "Alert"
    };

    this.displayMessages = function (results, messageType) {
        if (typeof (results) == "string") {
            results = [results];
        }
        var message = "";

        for (var i = 0; i < results.length; i++) {
            message += '<li>' + results[i] + '</li>';
        }
        displayMessage(message, messageType);
        Util.scrollTop();
    };

    function displayMessage(message, messageType) {
        var isModalOpen = $('#modalDialog').hasClass('in');
        var validationDiv;
        if (isModalOpen) {
            validationDiv = $("#modalDialog [data-valmsg-summary=true]");
        } else {
            validationDiv = $("[data-valmsg-summary=true]").not("#modalDialog [data-valmsg-summary=true]");
        }
        setValidationClass(validationDiv, messageType);

        var messagesUl = $(validationDiv).find("ul");
        messagesUl.empty();
        messagesUl.append(message);
    }


    this.clearMessages = function () {
        $('.validation-summary-errors').hide();
    }

    function setValidationClass(validationDiv, messageType) {
        if (messageType == Message.MessageType.SUCCESS) {
            $(validationDiv).addClass("validation-summary-success");
            $(validationDiv).removeClass("validation-summary-valid");
            $(validationDiv).removeClass("validation-summary-errors");
        } else {
            $(validationDiv).removeClass("validation-summary-success");
            $(validationDiv).removeClass("validation-summary-valid");
            $(validationDiv).addClass("validation-summary-errors");
        }
        $(validationDiv).show();
    }

};