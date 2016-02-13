"use strict";

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
	let canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	paper.install(window);
}


NBodyContext.prototype.run = function () {
	let $this = this;
	view.onFrame = function (event) {
		$this.simStrategy.simulate();
		$this.draw();
	}
}


NBodyContext.prototype.draw = function () {
    let s = this.simStrategy;
    for (let i = 0; i < s.getNumBodies(); i++) {
		s.getBodies()[i].draw();
	}
}


NBodyContext.prototype.addStrategy = function (buttonID, strategyClass) {

    let $this = this;
    let b = document.getElementById(buttonID);

    b.onclick = function () {
        project.clear();
        $this.simStrategy = new strategyClass();
        $this.run();
    }
}
