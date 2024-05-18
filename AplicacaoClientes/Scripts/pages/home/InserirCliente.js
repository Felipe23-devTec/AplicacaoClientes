$(document).ready(function () {

    //$("#salvarUser").on("click", function () {
    //    alert("clicou")
    //});
    //obs: para evitar o envio mais de uma vez do formulario pode ser usado o .off('submit') ou .unbind('submit')
    $("#form-insert-user").unbind('submit').submit(function (e) {
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
       
        $.ajax({
            type: 'post',
            url: "/Home/SalvarUsuario",
            data: fdata,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }).done(function (result) {
            // do something with the result now
            if (result.status === "success") {

                alert('Sucesso!');
                

                //window.location.replace("/Home/TelaCadastro");
            } else {
                alert('falha!')
            }
        });
    });
    $(".close").on("click", function () {
        $("#modalDialog").modal('hide');
    });

    
});