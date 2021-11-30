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
        /*
                Bienvenido.style.visibility = "visible";
                cargarModelos();
                Contenedor.style.visibility = "hidden";
                Contenedor.style.opacity = 0;
                Canvas.style.visibility = "visible";
                Canvas.style.opacity = 1;
                cargado = true;
        */
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
                dificultad = false;
                setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                await cargarModelos();
                setTimeout(function () {
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;
                        cargado = true;
                }, 2000);

        });
        $("#SelecDificil").click(async function () {
                dificultad = true;
                setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                await cargarModelos();

                setTimeout(function () {
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

async function cargarModelos() {
        /***** THREEJS****/
        
        await setupScene();
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        players[0].name = NombreSave;
        players[1].name = NombreSave2;
        players[0].encontrados = 0;
        players[1].encontrados = 0
        players[0].escena = 1;
        players[1].escena = 1;

        await loadOBJWithMTL("assets/", "casa.obj", "casa.mtl", (objetoCargado) => {
                objetoCargado.rotation.set(-1.3, 0, 0);
                objetoCargado.scale.set(5, 5, 5);
                objetoCargado.position.set(0, -50, 34.5);
                escenario01 = objetoCargado.clone();
                console.log("01");
                v1 = true;
        });


        await loadOBJWithMTL("assets/", "jardin.obj", "jardin.mtl", (objetoCargado) => {
                objetoCargado.scale.set(1.7, 3, 8);
                objetoCargado.rotation.set(-1.5, -3.15, 0);
                objetoCargado.position.set(-2, -200, 35);
                escenario02 = objetoCargado.clone();
                console.log("02");
                v2 = true;


        });

        await loadOBJWithMTL("assets/", "escena03.obj", "escena03.mtl", (objetoCargado) => {
                objetoCargado.rotation.set(-1.5, -2.5, 0);
                objetoCargado.scale.set(9, 10, 9);
                objetoCargado.position.set(9, -100, 50.6);
                escenario03 = objetoCargado.clone();
                console.log("03");
                isWorldReady = true;
                v3 = true;

        });


        await loadOBJWithMTL("assets/miniatureCat/", "Miniature_cat_SF.obj", "Miniature_cat_SF.mtl", (objetoCargado) => {
                objetoCargado.scale.set(5, 5, 5);
                objetoCargado.rotation.set(-1.5, 1.3, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_01_P1 = objetoCargado.clone();
                Obj_01_P2 = objetoCargado.clone();
                console.log("04");
                v4 = true;

        });
        
        await loadOBJWithMTL("assets/latita/", "latita.obj", "latita.mtl", (objetoCargado) => {
                objetoCargado.scale.set(5, 5, 5);
                objetoCargado.rotation.set(-1.1, 1.3, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_02_P1 = objetoCargado.clone();
                Obj_02_P2 = objetoCargado.clone();
                console.log("05");
                v5 = true;

        });

        await loadOBJWithMTL("assets/collar/", "collar.obj", "collar.mtl", (objetoCargado) => {
                objetoCargado.scale.set(5, 5, 5);
                objetoCargado.rotation.set(-1.5, 1, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_03_P1 = objetoCargado.clone();
                Obj_03_P2 = objetoCargado.clone();
                console.log("06");
                v6 = true;

        });

        await loadOBJWithMTL("assets/llave/", "llave.obj", "llave.mtl", (objetoCargado) => {
                objetoCargado.scale.set(1, 1, 1);
                objetoCargado.rotation.set(0, 1, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_04_P1 = objetoCargado.clone();
                Obj_04_P2 = objetoCargado.clone();
                console.log("07");
                v7 = true;

        });

        await loadOBJWithMTL("assets/palito/", "palito.obj", "palito.mtl", (objetoCargado) => {
                objetoCargado.scale.set(5, 5, 5);
                objetoCargado.rotation.set(-1.5, 1, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_05_P1 = objetoCargado.clone();
                Obj_05_P2 = objetoCargado.clone();
                console.log("08");
                v8 = true;

        });
        await loadOBJWithMTL("assets/perrito/", "perrito.obj", "perrito.mtl", (objetoCargado) => {
                objetoCargado.scale.set(2, 2, 2);
                objetoCargado.rotation.set(-1.5, 0, 0);
                objetoCargado.position.set(0, 0, 0);
                Obj_06_P1 = objetoCargado.clone();
                Obj_06_P2 = objetoCargado.clone();
                v9 = true;
                console.log("09");

        });

        await render();
}

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(path);

        //Función anonima llamada lambda
        mtlLoader.load(mtlFile, (materialCargado) => {
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



