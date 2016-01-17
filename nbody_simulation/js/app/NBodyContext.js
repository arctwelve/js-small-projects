"use strict";


var NBodyContext = function () {

	this.initCanvas();
	
	this.strategy = new SpiralStrategy();
	this.accumulator = new ForceAccumulator(this.strategy);
	
	this.localizeStrategy(strategy);
	this.run();
}


NBodyContext.prototype.run = function () {

	var _this = this;
	view.onFrame = function(event) {
		_this.draw();
		_this.integrate();
		_this.accumulator.accumulateForces();
	}    
}


NBodyContext.prototype.integrate = function () {
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].integrate(this.dt2, this.damping);              
	}       
}


NBodyContext.prototype.draw = function () {
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].draw();                
	}       
}


NBodyContext.prototype.localizeStrategy = function (strat) {
	this.bodies = strat.bodies;
	this.numBodies = strat.bodies.length;
	this.damping = strat.damping;
	this.dt2 = Math.pow(strat.timeStep, 2);
}


NBodyContext.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);
}