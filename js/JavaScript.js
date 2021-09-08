$(document).ready(function () {

        var Bienvenido = document.getElementById("Bienvenido");
        var Cargando = document.getElementById("Cargando");
        var Contenedor = document.getElementById("contenedor");
        var Canvas = document.getElementById("contCanvas");
        var Iconos = document.getElementById("config");
        var Musica = document.getElementById("Musica");
        var Sonido = document.getElementById("Sonido");
        let modal1 = document.getElementById("modal-1");

        Bienvenido.style.visibility = "visible";
        var NombreSave;
        $("#btnEnviar").click(function(){
                var nombre = document.getElementById("txtName").value;
                if(nombre!="") {
                        /*
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
                        */
                        Bienvenido.style.visibility = "hidden";
                        Bienvenido.style.opacity = 0;
                        Dificultad.style.visibility = "visible";
                        Dificultad.style.opacity = 1;
                        NombreSave = nombre;
                }
                else{
                        alert("Por favor escriba su nombre");
                }
        });


        $("#SelecNormal").click(function(){                
                setTimeout(function(){
                        $("#Saludo").text("Hola " + NombreSave);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                setTimeout(function(){
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;
                }, 2000);
        });
        $("#SelecDificil").click(function(){                
                setTimeout(function(){
                        $("#Saludo").text("Hola " + NombreSave);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                setTimeout(function(){
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Iconos.style.visibility = "visible";
                        Iconos.style.opacity = 1;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;

                }, 2000);
        });


        $("#config ").click(function(){                
                setTimeout(function(){
                        modal1.style.visibility = "visible";
                        modal1.style.opacity = 1;
                }, 500);
        });

        $("#configuracion").click(function(){                
                setTimeout(function(){
                        modal1.style.visibility = "hidden";
                        modal1.style.opacity = 0;
                }, 500);
        });
});