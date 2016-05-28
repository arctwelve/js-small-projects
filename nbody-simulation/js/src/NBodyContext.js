"use strict";


/*
 * In the Strategy design pattern, the context class holds or manages
 * the Strategy classes. The NBodyContext class also acts as the top
 * level 'Engine' class for the demo: initializing, applying the selected
 * strategy and running the main loop.
 */
var NBodyContext = function () {

    this.addStrategy("obtBtn", OrbitStrategy);
    this.addStrategy("cptBtn", CarpetStrategy);
    this.addStrategy("sprBtn", SpiralStrategy);
    this.addStrategy("dstBtn", DistanceForceStrategy);
    this.addStrategy("mouBtn", MouseEventStrategy);

    this.initCanvas();
    this.simStrategy = new SpiralStrategy();
    this.run();
}


NBodyContext.prototype.initCanvas = function () {
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);
}


NBodyContext.prototype.run = function () {
    var $this = this;
    view.onFrame = function (event) {
        $this.simStrategy.simulate();
        $this.draw();
    }
}


NBodyContext.prototype.draw = function () {
    var s = this.simStrategy;
    for (var i = 0; i < s.getNumBodies(); i++) {
        s.getBodies()[i].draw();
    }
}


/*
 * Adds a strategy to the context and attaches it to the passed button element.
 */
NBodyContext.prototype.addStrategy = function (buttonID, strategyClass) {

    var $this = this;
    var b = document.getElementById(buttonID);

    b.onclick = function () {
        project.clear();
        view.off({mousedown: '', mousemove: '', mouseup: ''});
        $this.simStrategy = new strategyClass();
        $this.run();
    }
}
