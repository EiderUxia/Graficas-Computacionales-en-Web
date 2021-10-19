var scene;
var camera;
var renderer;
var controls;
var objects = [];
var clock;
var deltaTime;
var keys = {};
var cube;
$(document).ready(function () {
  setupScene();
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  render();
});

function onKeyDown(event) {
  keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
  keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
  requestAnimationFrame(render);
  deltaTime = clock.getDelta();

  //Reiniciar variables
  for (var i = 0; i < players.length; i++) {
    players[i].yaw = 0;
    players[i].forward = 0;
  }

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
  }

  //Player 2
  if (keys["J"]) {
    players[1].yaw = 5;
  } else if (keys["L"]) {
    players[1].yaw = -5;
  }
  if (keys["I"]) {
    players[1].forward = -5;
  } else if (keys["K"]) {
    players[1].forward = 5;
  }

  // 1 Vemos la rotacion de la camara y movimiento
  //cameras[0].rotation.y += yaw * deltaTime;
  //cameras[0].translateZ(forward * deltaTime);

  //Crear la rotacion y mivimiento de los jugadores
  //Reiniciar variables
  for (var i = 0; i < players.length; i++) {
    players[i].rotation.y += players[i].yaw * deltaTime;
    players[i].translateZ(players[i].forward * deltaTime);
  }

  renderers[0].render(scene, cameras[0]);
  renderers[1].render(scene, cameras[1]);
}

//Global para su uso en otras funciones
var visibleSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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
  player2.position.x = -1;

  scene.add(player1);
  scene.add(player2);

  players.push(player1);
  players.push(player2);

  player1.yaw = 0;
  player1.forward = 0;

  player2.yaw = 0;
  player2.forward = 0;

  player1.add(cameras[0]);
  player2.add(cameras[1]);

  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 2;
  scene.add(cube);

  // 2 Vemos como hacer una camara en 3era persona
  //camera.position.y = 1;
  //cube.add(camera);

  $("#scene-section").append(renderers[0].domElement);
  $("#scene-section-2").append(renderers[1].domElement);
}

//Arreglos
var renderers = [];
var cameras = [];
var players = [];

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