function escena01() {
    //$('#scene-section').css("background-image", "url(./assets/forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/forest.jpg)");
    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario01.name = "escenario01";
    var copia = escenario01.clone();
    copia.name = "escenario01_copia"
    //scene.add(escenario01);
    scene2.add(copia);
    cantidasObP1 = 3;
    cantidasObP2 = 3;
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 01
    /***********************************************************************/
    /***********************************************************************/

    var obj01_01 = Obj_01_P1.clone();
    obj01_01.position.x = 5;
    obj01_01.name = "obj01_01";

    var obj02_01 = Obj_01_P1.clone();
    obj02_01.position.x = 10;
    obj02_01.name = "obj02_01";

    var obj03_01 = Obj_01_P1.clone();
    obj03_01.position.x = 15;
    obj03_01.name = "obj03_01";

    scene.add(obj01_01);
    scene.add(obj02_01);
    scene.add(obj03_01);
    objetosConColision.push(obj01_01);
    objetosConColision.push(obj02_01);
    objetosConColision.push(obj03_01);
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 02
    /***********************************************************************/
    /***********************************************************************/
    var obj01_02 = Obj_01_P2.clone();
    obj01_02.position.x = 5;
    obj01_02.name = "obj01_02";

    scene2.add(obj01_02);
    objetosConColision2.push(obj01_02);
    /***********************************************************************/
    /***********************************************************************/
    escenario_en_curso = true;
}

function escena02() {
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        cargado = false;
    }, 5);
    console.log("escena02");
    entreEscenas();
    setTimeout(function () {
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;
    }, 5000);
}

function entreEscenas() {
    $('#scene-section').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    objetosConColision = [];
    objetosConColision2 = [];
    cantidasObP1 = 3;
    cantidasObP2 = 3;
    /***********************************************************************/
    /***********************************************************************/
    var escenario01 = scene.getObjectByName("escenario01");
    var ob01_01 = scene.getObjectByName("obj01_01");
    var ob02_01 = scene.getObjectByName("obj02_01");
    var ob03_01 = scene.getObjectByName("obj03_01");
    scene.remove(escenario01);
    scene.remove(ob01_01);
    scene.remove(ob02_01);
    scene.remove(ob03_01);
    /***********************************************************************/
    /***********************************************************************/
    var escenario01_copia = scene2.getObjectByName("escenario01_copia");
    var obj01_02 = scene.getObjectByName("obj01_02");
    scene2.remove(escenario01_copia);
    scene.remove(obj01_02);
    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario02.name = "escenario02"
    var copia = escenario02.clone();
    copia.name = "escenario02_copia"
    scene.add(escenario02);
    scene2.add(copia);
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 01
    /***********************************************************************/
    /***********************************************************************/
    var obj01_01 = Obj_01_P1.clone();
    obj01_01.position.x = 5;
    obj01_01.name = "obj01_01";

    var obj02_01 = Obj_01_P1.clone();
    obj02_01.position.x = 10;
    obj02_01.name = "obj02_01";

    var obj03_01 = Obj_01_P1.clone();
    obj03_01.position.x = 15;
    obj03_01.name = "obj03_01";

    scene.add(obj01_01);
    scene.add(obj02_01);
    scene.add(obj03_01);
    objetosConColision.push(obj01_01);
    objetosConColision.push(obj02_01);
    objetosConColision.push(obj03_01);
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 02
    /***********************************************************************/
    /***********************************************************************/
    var obj01_02 = Obj_01_P2.clone();
    obj01_02.position.x = 5;
    obj01_02.name = "obj01_02";

    scene2.add(obj01_02);
    objetosConColision2.push(obj01_02);
    /***********************************************************************/
    /***********************************************************************/
    escenario_en_curso = true;
}

function escena03() {
    $('#scene-section').css("background-image", "url(./assets/forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/forest.jpg)");
    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario03.name = "escenario03";
    var copia = escenario03.clone();
    copia.name = "escenario03_copia"
    scene.add(escenario03);
    scene2.add(copia);
    cantidasObP1 = 3;
    cantidasObP2 = 3;
    escenario_en_curso = true;
}
