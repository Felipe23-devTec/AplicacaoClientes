$(document).ready(function () {

    //$("#salvarUser").on("click", function () {
    //    alert("clicou")
    //});
    $("#form-insert-user").submit(function (e) {
        e.preventDefault();
        var formAction = $(this).attr("action");
        var fdata = $(this).serialize();;

        console.log("Dados codificados: " + fdata);

        // Para ver os dados em formato legível
        var decodedData = decodeURIComponent(fdata);
        console.log("Dados decodificados: " + decodedData);
        var nome = $("#nome").val();
        var email = $("#email").val();
        console.log("Nome: " + nome);
        console.log("Email: " + email);
    });
    $(".close").on("click", function () {
        $("#modalDialog").modal('hide');
    });

    
});