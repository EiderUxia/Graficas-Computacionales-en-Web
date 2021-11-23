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

    reiniciarVariables();

    actualizarRenderer();

    if (cargado == true) {
            teclas();
    }

    movimiento();

    renderers[0].render(scene, cameras[0]);
    renderers[1].render(scene2, cameras[1]);

}
