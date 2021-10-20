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
        Bienvenido.style.visibility = "visible";
        var NombreSave;
        var NombreSave2;

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
                                players[0].name = NombreSave;
                                players[1].name = NombreSave2;

                                players[0].encontrados = 0;
                                players[1].encontrados = 1;

                                players[0].escena = 1;
                                players[1].escena = 0;
                        } else {
                                alert("Falta nombre del jugador 2");
                        }
                } else {
                        alert("Falta nombre del jugador 1");
                }
        });

        $("#SelecNormal").click(function () {
                setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                setTimeout(function () {
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Canvas.style.visibility = "visible";
                        Canvas.style.opacity = 1;
                        cargado = true;
                }, 2000);
        });
        $("#SelecDificil").click(function () {
                setTimeout(function () {
                        $("#Saludo").text("Hola " + NombreSave + " y " + NombreSave2);
                        Dificultad.style.visibility = "hidden";
                        Dificultad.style.opacity = 0;
                        Cargando.style.visibility = "visible";
                        Cargando.style.opacity = 1;
                }, 500);
                setTimeout(function () {
                        Contenedor.style.visibility = "hidden";
                        Contenedor.style.opacity = 0;
                        Iconos.style.visibility = "visible";
                        Iconos.style.opacity = 1;
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

        /***** THREEJS****/
        setupScene();
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);


        loadOBJWithMTL("assets/", "escenario.obj", "Escenario.mtl", (objetoCargado) => {
                objetoCargado.position.set(70, 10, 0);
                objetoCargado.scale.set(0.01, 0.01, 0.01);

                scene.add(objetoCargado);
        });
        render();
});

var cargado;
var scene;
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
//Global para su uso en otras funciones
var visibleSize = {
        width: window.innerWidth,
        height: window.innerHeight,
};

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(path);

        //Función anonima llamada lambda
        mtlLoader.load(mtlFile, (materialCargado) => {
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

function onKeyDown(event) {
        keys[String.fromCharCode(event.keyCode)] = true;

}
function onKeyUp(event) {
        keys[String.fromCharCode(event.keyCode)] = false;
}

function setupScene() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();

        createCamera();
        createCamera();

        createRenderer(new THREE.Color(0, 0, 0));
        createRenderer(new THREE.Color(0.2, 0.2, 0.2));

        var ambientLight = new THREE.AmbientLight(
                new THREE.Color(1, 1, 1),
                1.0
        );
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(
                new THREE.Color(1, 1, 0),
                0.4
        );
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);

        var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
        grid.position.y = -1;
        scene.add(grid);

        var material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.0, 0.0),
        });
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        var player1 = new THREE.Mesh(geometry, material);
        player1.position.x = 1;

        var player2 = player1.clone();
        player2.material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.5, 0.0),
        });
        player2.position.set(31.04, 14.33, -1.76);
        player2.rotation.y = THREE.Math.degToRad(45);

        scene.add(player1);
        scene.add(player2);

        players.push(player1);
        players.push(player2);

        player1.yaw = 0;
        player1.forward = 0;

        player2.yaw = 0;
        player2.forward = 0;

        escena01();
        //escena02();

        $("#scene-section").append(renderers[0].domElement);
        $("#scene-section-2").append(renderers[1].domElement);
}

function createCamera() {
        var camera = new THREE.PerspectiveCamera(
                75,
                visibleSize.width / visibleSize.height,
                0.1,
                100
        );
        cameras.push(camera);
}

function createRenderer(color) {
        var renderer = new THREE.WebGLRenderer({ precision: "mediump" });
        renderer.setClearColor(color);
        renderer.setPixelRatio(visibleSize.width / 2 / visibleSize.height);
        renderer.setSize(visibleSize.width / 2, visibleSize.height);
        renderers.push(renderer);
}

function actualizarRenderer() {
        for (var i = 0; i < renderers.length; i++) {
                renderers[i].setPixelRatio(visibleSize.width / 2 / visibleSize.height);
                renderers[i].setSize(visibleSize.width / 2, visibleSize.height);
        }
        visibleSize = {
                width: window.innerWidth,
                height: window.innerHeight,
        };
}

function render() {
        requestAnimationFrame(render);
        deltaTime = clock.getDelta();

        //Reiniciar variables
        for (var i = 0; i < players.length; i++) {
                players[i].yaw = 0;
                players[i].forward = 0;
                players[i].elevacion = 0;
        }

        actualizarRenderer();

        if (cargado == true) {
                $("#tablita tr").remove();
                var fila = "<tr><td class='titulo' >" + players[0].name + "</td><td class='titulo'>" + players[0].encontrados + "</td><td class='titulo'>" + players[0].escena + "</td></tr>";
                var btn = document.createElement("TR");
                btn.innerHTML = fila;
                var fila2 = "<tr><td class='titulo' >" + players[1].name + "</td><td class='titulo'>" + players[1].encontrados + "</td><td class='titulo'>" + players[1].escena + "</td></tr>";
                var btn2 = document.createElement("TR");
                btn2.innerHTML = fila2;
                document.getElementById("tablita").appendChild(btn);
                document.getElementById("tablita").appendChild(btn2);


                //Player 1
                if (keys["A"]) {
                        players[0].yaw = 5;
                } else if (keys["D"]) {
                        players[0].yaw = -5;
                }
                if (keys["W"]) {
                        players[0].forward = -5;
                } else if (keys["S"]) {
                        players[0].forward = 5;
                } else if (keys["Q"]) {
                        players[0].elevacion = 5;
                } else if (keys["E"]) {
                        players[0].elevacion = -5;
                }


                //Player 2
                if (keys["%"]) {
                        players[1].yaw = 5;
                } else if (keys["'"]) {
                        players[1].yaw = -5;
                }
                if (keys["&"]) {
                        players[1].forward = -5;
                } else if (keys["("]) {
                        players[1].forward = 5;
                } else if (keys["a"]) {
                        players[1].elevacion = 5;
                } else if (keys["b"]) {
                        players[1].elevacion = -5;
                }


                if (keys["R"]) {
                        console.log(players[0].position);
                        console.log(players[1].position);
                }
        }



        //Crear la rotacion y mivimiento de los jugadores
        for (var i = 0; i < players.length; i++) {
                players[i].rotation.y += players[i].yaw * deltaTime;
                players[i].translateZ(players[i].forward * deltaTime);
                players[i].translateY(players[i].elevacion * deltaTime);
                //console.log(players[i].elevacion);
        }

        renderers[0].render(scene, cameras[0]);
        renderers[1].render(scene, cameras[1]);

}

function escena01() {
        cameras[0].position.set(31.04, 14.33, -1.76);
        cameras[0].rotation.y = THREE.Math.degToRad(45);
        cameras[1].position.set(31.04, 14.33, -1.76);
        cameras[1].rotation.y = THREE.Math.degToRad(45);
        players[0].position.set(28.12, 14.33, -4.67);
        players[1].position.set(28.12, 14.33, -4.67);

}

function escena02() {
        cameras[0].position.set(43.42, 19.78, 27.85);
        cameras[0].rotation.y = THREE.Math.degToRad(100);
        cameras[1].position.set(43.42, 19.78, 27.85);
        cameras[1].rotation.y = THREE.Math.degToRad(100);
        players[0].position.set(41.08, 19.78, 27.99);
        players[1].position.set(41.08, 19.78, 27.99);
        players[0].scale.set(0.5,0.5,0.5);
        players[1].scale.set(0.5,0.5,0.5);
}
