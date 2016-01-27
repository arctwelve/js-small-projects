"use strict";


var NBodyContext = function () {

	this.initCanvas();
	this.simStrategy = new DistanceForceStrategy();
	this.run();
}


NBodyContext.prototype.run = function () {

	var _this = this;
	view.onFrame = function (event) {
		_this.simStrategy.simulate();
		_this.draw();
	}
}


NBodyContext.prototype.draw = function () {

    var bodies = this.simStrategy.getBodies();
    var numBodies = this.simStrategy.getNumBodies();

    for (var i = 0; i < numBodies; i++) {
		bodies[i].draw();
	}
}


NBodyContext.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	paper.install(window);
}
