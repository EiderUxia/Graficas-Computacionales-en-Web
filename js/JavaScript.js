$(document).ready(function () {

        var Bienvenido = document.getElementById("Bienvenido");
        var Cargando = document.getElementById("Cargando");
        var Contenedor = document.getElementById("contenedor");
        var Canvas = document.getElementById("contCanvas");
        Bienvenido.style.visibility = "visible";

        $("#btnEnviar").click(function(){
                var nombre = document.getElementById("txtName").value;
                if(nombre!="") {
                        $("#Saludo").text("Hola " + nombre);
                        setTimeout(function(){
                                Bienvenido.style.visibility = "hidden";
                                Bienvenido.style.opacity = 0;
                                Cargando.style.visibility = "visible";
                                Cargando.style.opacity = 1;
                        }, 500);
                        setTimeout(function(){
                                Contenedor.style.visibility = "hidden";
                                Contenedor.style.opacity = 0;
                                Canvas.style.visibility = "visible";
                                Canvas.style.opacity = 1;
                        }, 2000);

                                
                }
                else{
                        alert("Por favor escriba su nombre");
                }
        });
});