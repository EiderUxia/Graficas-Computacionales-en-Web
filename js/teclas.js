function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
    //debugger;

}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function reiniciarVariables() {
    //Reiniciar variables
    for (var i = 0; i < players.length; i++) {
        players[i].yaw = 0;
        players[i].forward = 0;
    }
}

function teclas() {
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
    } else if (keys["Q"]) {
        for (var i = 0; i < players[0].rayos.length; i++) {

            var rayo = players[0].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[0].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision, true);


            if (colisiones.length > 0 && colisiones[0].distance < 50) {
                console.log("Colisionando! 01");
                colisiones[0].object.rotation.x = 2;
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
    } else if (keys["a"]) {
        for (var i = 0; i < players[1].rayos.length; i++) {

            var rayo = players[1].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[1].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision2, true);


            if (colisiones.length > 0 && colisiones[0].distance < 50) {
                console.log("Colisionando! 02");
                colisiones[0].object.rotation.x = 2;
            }

        }
    }
}

function movimiento() {
    //crear movimiento
    for (var i = 0; i < players.length; i++) {
        players[i].position.x += players[i].yaw * deltaTime;
        players[i].position.z += players[i].forward * deltaTime;
    }

}