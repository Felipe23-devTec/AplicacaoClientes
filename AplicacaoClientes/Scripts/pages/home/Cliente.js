$(document).ready(function () {
    $('#table').DataTable({
        "paging": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 10,
        ajax: {
            url: "/Home/Clientes",
            type: 'POST',
            data: function (d) {
                return $.extend({}, d, {
                    
                });
            },
            dataSrc: function (json) {
                if (!json) json = [];

                //if (json.error != null) {
                //    location.href = json.error;
                //}

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
            { data: 'Nome', title: 'Nome' },
            { data: 'Email', title: 'Email' },
            { data: 'Sexo', title: 'Sexo' },
            { data: 'Status', title: 'Status' }

        ],
    });
});