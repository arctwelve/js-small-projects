"use strict";


var NBodySystem = function () {

	this.initCanvas();
	
	var strategy = new SpiralStrategy();
	
	this.accumulator = new ForceAccumulator(strategy);
	this.localizeStrategy(strategy);
	this.run();
}


NBodySystem.prototype.run = function () {

	var _this = this;
	view.onFrame = function(event) {
		_this.draw();
		_this.integrate();
		_this.accumulator.accumulateForces();
	}    
}


NBodySystem.prototype.integrate = function () {
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].integrate(this.dt2, this.damping);              
	}       
}


NBodySystem.prototype.draw = function () {
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].draw();                
	}       
}


NBodySystem.prototype.localizeStrategy = function (strat) {
	this.bodies = strat.bodies;
	this.numBodies = strat.bodies.length;
	this.damping = strat.damping;
	this.dt2 = Math.pow(strat.timeStep, 2);
}


NBodySystem.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);
}