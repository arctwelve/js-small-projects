"use strict";

  
var ForceAccumulator = function (strategy) {
	this.localizeStrategy(strategy)
}

    
 /*
  * Determines forces acting on each body by the combination of all the other
  * bodies. Uses law of universal gravitation: F = G * (m1 * m2) / d^2
  */
ForceAccumulator.prototype.accumulateForces = function () {  
	
	var force = new Point();

	for (var i = 0; i < this.numBodies; i++) {
		var pa = this.bodies[i];

		for (var j = i + 1; j < this.numBodies; j++) {
			var pb = this.bodies[j];

			var vect = pb.curr.subtract(pa.curr);
			var dist = vect.x * vect.x + vect.y * vect.y;
			
			force.angle = vect.angle;
			force.length = (this.gravity * pa.mass * pb.mass) / dist * dist;
				
			pa.addForce(force);
			force = force.multiply(-1);
			pb.addForce(force); 
		}
	}
}


ForceAccumulator.prototype.localizeStrategy = function (strat) {
	this.gravity = strat.gravity;
	this.bodies = strat.bodies;
	this.numBodies = strat.bodies.length;
}