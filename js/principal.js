var cargado;
var scene;
var scene2;
var camera;
var renderer;
var controls;
var clock;
var deltaTime;
var keys = {};
var Canvas1 = document.getElementById("scene-section");
var Canvas2 = document.getElementById("scene-section-2");
//Arreglos
var renderers = [];
var cameras = [];
var players = [];
var NombreSave;
var NombreSave2;
var RCaster;
var objetosConColision = [];
var objetosConColision2 = [];
var isWorldReady = false;
//Global para su uso en otras funciones
var visibleSize = {
        width: window.innerWidth,
        height: window.innerHeight,
};


$(document).ready(function () {
        var Bienvenido = document.getElementById("Bienvenido");
        var Cargando = document.getElementById("Cargando");
        var Contenedor = document.getElementById("contenedor");
        var Canvas = document.getElementById("contCanvas");
        var Iconos = document.getElementById("config");
        var Musica = document.getElementById("Musica");
        var Sonido = document.getElementById("Sonido");
        let modal1 = document.getElementById("modal-1");
        cargado = false;
        RCaster = new THREE.Raycaster();

        Bienvenido.style.visibility = "visible";
        cargar();
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;

        $("#btnEnviar").click(function () {
                var nombre = document.getElementById("input").value;
                var nombre2 = document.getElementById("input2").value;
                if (nombre != "") {
                        if (nombre2 != "") {
                                Bienvenido.style.visibility = "hidden";
                                Bienvenido.style.opacity = 0;
                                Dificultad.style.visibility = "visible";
                                Dificultad.style.opacity = 1;
                                NombreSave = nombre;
                                NombreSave2 = nombre2;

                        } else {
                                alert("Falta nombre del jugador 2");
                        }
                } else {
                        alert("Falta nombre del jugador 1");
                }
        });

        $("#SelecNormal").click(async function () {

                await setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                cargar();

                await setTimeout(function () {
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;
                        cargado = true;
                }, 2000);

        });
        $("#SelecDificil").click(async function () {

                await setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                cargar();

                await setTimeout(function () {
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;
                        cargado = true;
                }, 2000);

        });

        $("#config ").click(function () {
                setTimeout(function () {
                        modal1.style.visibility = "visible";
                        modal1.style.opacity = 1;
                }, 500);
        });

        $("#configuracion").click(function () {
                setTimeout(function () {
                        modal1.style.visibility = "hidden";
                        modal1.style.opacity = 0;
                }, 500);
        });


});

async function cargar() {
        /***** THREEJS****/
        setupScene();
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);


        await loadOBJWithMTL("assets/", "keki.obj", "keki.mtl", (objetoCargado) => {
                objetoCargado.position.set(0, 0, 0);
                objetoCargado.scale.set(1, 1, 1);

                scene.add(objetoCargado);
                var objetoCargado2 = objetoCargado.clone();
                scene2.add(objetoCargado2);

                objetosConColision.push(objetoCargado);
                objetosConColision2.push(objetoCargado2);
                isWorldReady = true;
        });

        players[0].name = NombreSave;
        players[1].name = NombreSave2;

        render();
}

async function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(path);

        //Función anonima llamada lambda
        await mtlLoader.load(mtlFile, (materialCargado) => {
                materialCargado.preload();
                //Este bloque se ejecuta solo cuando termina de cargar el MTL

                var objLoader = new THREE.OBJLoader();
                objLoader.setPath(path);
                objLoader.setMaterials(materialCargado);

                objLoader.load(objFile, (objCargado) => {
                        //Este bloque se ejecuta solo cuando termina de cargar el OBJ
                        onLoadCallback(objCargado);
                });

        });

}


