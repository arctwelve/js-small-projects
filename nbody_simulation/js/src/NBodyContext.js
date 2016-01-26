"use strict";


var NBodyContext = function () {

	this.initCanvas();
	this.strategy = new DistanceForceStrategy();
	this.run();
}


NBodyContext.prototype.run = function () {

	var _this = this;
	view.onFrame = function (event) {
		_this.strategy.simulate();
		_this.draw();
	}
}


NBodyContext.prototype.draw = function () {
	for (var i = 0; i < this.strategy.getNumBodies(); i++) {
		this.strategy.bodies[i].draw();
	}
}


NBodyContext.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	paper.install(window);
}
