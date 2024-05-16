$(document).ready(function () {
    $('#table').DataTable({
        "paging": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 10,
        "language": {
            "lengthMenu": "Display _MENU_ resultados por pagina",
            "zeroRecords": "Nenhum resultado encontrado!",
            "info": "Showing _PAGE_ of _PAGES_",
            "infoEmpty": "Atualmente",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "search": "Pesquisar Cliente:",
            "searchPlaceholder": "Ex: Nome de cliente...",
            "processing": "Processando...",
            "paginate": {
                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            },
            "charset": "utf-8"
        },
        ajax: {
            url: "/Home/Clientes",
            type: 'POST',
            data: function (d) {
                return $.extend({}, d, {

                });
            },
            dataSrc: function (json) {
                if (!json) json = [];

                return json.data;
            },
            columnDefs: [
                { orderable: false, targets: 0 },
                { orderable: false, targets: -1 },
                { className: 'text-center', targets: '_all' }
            ],
            error: function (xhr, error, thrown) {
                console.log('Erro ao recuperar os dados:', error); // Exibir o erro no console
                console.log(xhr.responseText);
            }
        },

        columns: [
            { data: 'Nome', title: 'Nome', className: "text-center" },
            { data: 'Email', title: 'Email', className: "text-center" },
            { data: 'Sexo', title: 'Sexo', className: "text-center" },
            {
                data: 'Status',
                title: 'Status',
                className: "text-center",
                render: function (data, type, row) {
                    if (data == true) {
                        return '<span style="color:green; font-size: 30px">&#9679;</span>';
                    } else {
                        return '<span style="color:red; font-size: 30px">&#9679;</span>';
                    }
                }
            }

        ],
    });

    $("#openModal").on("click", function () {
        Dialog.show("Inserir Usuario", {
            url: "/Home/InserirCliente",
            type: "POST",
            success: function (data) {
                $('#modalDialogBody').html(data);
            }
        }, "", Dialog.DialogSizes.LARGE, function () {

            $("#modalDialogFooter").empty();
            $("#modalDialogFooter").append("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Fechar</button>");

        });
    });

    $("#salvarUser").on("click", function () {
        alert("clicou")
    });

});