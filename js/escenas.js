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
