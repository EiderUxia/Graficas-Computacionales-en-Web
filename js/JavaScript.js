$(document).ready(function () {

        var Bienvenido = document.getElementById("Bienvenido");
        var Cargando = document.getElementById("Cargando");
        Bienvenido.style.visibility = "visible";

        $("#btnEnviar").click(function(){
                var nombre = document.getElementById("txtName").value;
                if(nombre!="") {
                        $("#Saludo").text("Hola " + nombre);
                                Bienvenido.style.visibility = "hidden";
                                Cargando.style.visibility = "visible";
                }
                else{
                        alert("Por favor escriba su nombre");
                }
        });
});