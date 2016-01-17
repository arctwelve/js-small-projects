"use strict";


var AbstractStrategy = function (args) {
	
	this.G = args["gravity"];
	this.damping = args["damping"];
	this.timeStep = args["timeStep"];
	this.dt2 = Math.pow(this.timeStep, 2);
	
	this.bodies = [];
	this.numBodies = 0;
}


AbstractStrategy.prototype.simulate = function () {  
	this.accumulateForces();
	this.integrate();
}


AbstractStrategy.prototype.getBodies = function () {  
	return this.getBodies;
}


AbstractStrategy.prototype.getNumBodies = function () {  
	return this.numBodies;
}


AbstractStrategy.prototype.integrate = function () {  
	for (var i = 0; i < this.numBodies; i++) {
		this.bodies[i].integrate(this.dt2, this.damping);
	}
}


AbstractStrategy.prototype.accumulateForces = function () {  

	var force = new Point();

	for (var i = 0; i < this.numBodies; i++) {
		var pa = this.bodies[i];

		for (var j = i + 1; j < this.numBodies; j++) {
			var pb = this.bodies[j];

			var vect = pb.curr.subtract(pa.curr);
			var dist = vect.x * vect.x + vect.y * vect.y;

			force.angle = vect.angle;
			force.length = (this.G * pa.mass * pb.mass) / dist * dist;

			pa.addForce(force);
			force = force.multiply(-1);
			pb.addForce(force); 
		}
	}
}