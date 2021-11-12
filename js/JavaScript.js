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

        $("#SelecNormal").click( async function () {

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

function onKeyDown(event) {
        keys[String.fromCharCode(event.keyCode)] = true;
        //debugger;

}
function onKeyUp(event) {
        keys[String.fromCharCode(event.keyCode)] = false;
}

function setupScene() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene2 = new THREE.Scene();

        createCamera();
        createCamera();

        cameras[0].position.set(0,20,0);
        cameras[1].position.set(0,20,0);
        cameras[0].rotation.x = THREE.Math.degToRad(-90);
        cameras[1].rotation.x = THREE.Math.degToRad(-90);

        createRenderer(new THREE.Color(0, 0, 0));
        createRenderer(new THREE.Color(0.2, 0.2, 0.2));

        var ambientLight = new THREE.AmbientLight(
                new THREE.Color(1, 1, 1),
                1.0
        );
        var ambientLight2 = ambientLight.clone();
        scene.add(ambientLight);
        scene2.add(ambientLight2);

        var directionalLight = new THREE.DirectionalLight(
                new THREE.Color(1, 1, 0),
                0.4
        );
        directionalLight.position.set(0, 0, 1);
        var directionalLight2 = directionalLight.clone();
        scene.add(directionalLight);
        scene2.add(directionalLight2);

        var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
        grid.position.y = -1;
        var grid2 = grid.clone();
        scene.add(grid);
        scene2.add(grid2);

        var material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.0, 0.0),
        });
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        var player1 = new THREE.Mesh(geometry, material);
        player1.position.y = 10;

        var player2 = player1.clone();
        player2.material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.5, 0.0),
        });
         
        player1.rayos = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, -1, 0)

        ];
        player2.rayos = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, -1, 0)

        ];

        scene.add(player1);
        scene2.add(player2);

        players.push(player1);
        players.push(player2);

        player1.yaw = 0;
        player1.forward = 0;

        player2.yaw = 0;
        player2.forward = 0;

        //escena01();
        //escena02();
        //renderer[1].scene.player2.remove();

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
                        players[0].yaw = -10;
                } else if (keys["D"]) {
                        players[0].yaw = 10;
                }
                if (keys["W"]) {
                        players[0].forward = -10;
                } else if (keys["S"]) {
                        players[0].forward = 10;
                }else if (keys["Q"]) {
                        for(var i = 0; i < players[0].rayos.length; i++){

				var rayo = players[0].rayos[i];

				//1er parametro desde que punto va a ser lanzado el rayo o vector
				//2do parametro es el rayo o vector
				RCaster.set(players[0].position, rayo);

				//Detectar la colision de 1 objeto que se pone dentro de ()
				//true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
				var colisiones = RCaster.intersectObjects(objetosConColision, true);


				if(colisiones.length > 0 && colisiones[0].distance < 1){
					console.log("Colisionando! 01");
					colisiones[0].object.rotation.x =2;
				}
			
			}
                }


                //Player 2
                if (keys["%"]) {
                        players[1].yaw = -10;
                } else if (keys["'"]) {
                        players[1].yaw = 10;
                }
                if (keys["&"]) {
                        players[1].forward = -10;
                } else if (keys["("]) {
                        players[1].forward = 10;
                }else if (keys["a"]) {
                        for(var i = 0; i < players[1].rayos.length; i++){

				var rayo = players[1].rayos[i];

				//1er parametro desde que punto va a ser lanzado el rayo o vector
				//2do parametro es el rayo o vector
				RCaster.set(players[1].position, rayo);

				//Detectar la colision de 1 objeto que se pone dentro de ()
				//true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
				var colisiones = RCaster.intersectObjects(objetosConColision2, true);


				if(colisiones.length > 0 && colisiones[0].distance < 1){
					console.log("Colisionando! 02");
					colisiones[0].object.rotation.x =2;
				}
			
			}
                }


        
        }

        for (var i = 0; i < players.length; i++) {
                players[i].position.x += players[i].yaw * deltaTime;
                players[i].position.z += players[i].forward * deltaTime;                
        }

        renderers[0].render(scene, cameras[0]);
        renderers[1].render(scene2, cameras[1]);

}

function escena01() {
        /*
        cameras[0].position.set(31.04, 14.33, -1.76);
        cameras[0].rotation.y = THREE.Math.degToRad(45);
        cameras[1].position.set(31.04, 14.33, -1.76);
        cameras[1].rotation.y = THREE.Math.degToRad(45);
        players[0].position.set(28.12, 14.33, -4.67);
        players[1].position.set(28.12, 14.33, -4.67);
        */


        players[0].encontrados = 0;
        players[1].encontrados = 0;

        players[0].escena = 1;
        players[1].escena = 1;

}

function escena02() {
        cameras[0].position.set(43.42, 19.78, 27.85);
        cameras[0].rotation.y = THREE.Math.degToRad(100);
        cameras[1].position.set(43.42, 19.78, 27.85);
        cameras[1].rotation.y = THREE.Math.degToRad(100);
        players[0].position.set(41.08, 19.78, 27.99);
        players[1].position.set(41.08, 19.78, 27.99);
        players[0].scale.set(0.5, 0.5, 0.5);
        players[1].scale.set(0.5, 0.5, 0.5);


        players[0].encontrados = 5;
        players[1].encontrados = 3;

        players[0].escena = 2;
        players[1].escena = 2;
}
