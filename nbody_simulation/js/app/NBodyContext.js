"use strict";


var NBodyContext = function () {

	this.initCanvas();
	this.strategy = new SpiralStrategy();
	
	this.bodies = strategy.getBodies();
	this.numBodies = strategy.getNumBodies();
	this.run();
}


NBodyContext.prototype.run = function () {

	var _this = this;
	view.onFrame = function(event) {
		_this.strategy.simulate();
		_this.draw();
	}    
}


NBodyContext.prototype.draw = function () {
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].draw();                
	}       
}


NBodyContext.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);
}