"use strict";


/*
 * Alec Cove, 2016
 */
var NBodySystem = function () {

	var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);
	
	this.strategy = new SpiralStrategy();
	this.accumulator = new ForceAccumulator(strategy);
	
	this.bodies = strategy.bodies;
	this.numBodies = this.bodies.length;
}


NBodySystem.prototype.run = function () {

	var _this = this;
	view.onFrame = function(event) {
		_this.integrate();
		_this.accumulateForces();
		_this.draw();
	}    
}


NBodySystem.prototype.integrate = function () {
	for (var i = 0; i < this.numBodies; i++) {
		var b = this.bodies[i];
		this.bodies[i].integrate(this.dt2, this.damping);              
	}       
}


NBodySystem.prototype.accumulateForces = function () {
	this.accumulator.accumulateForces();
}


NBodySystem.prototype.draw = function () {
	for (var i = 0; i < this.numBodies; i++) {
		var b = this.bodies[i];
		b.draw();                
	}       
}