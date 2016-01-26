"use strict";


var DistanceForceStrategy = function () {

	AbstractStrategy.call(this, {timeStep:1/5, gravity:50, damping:0.998});

    var count = 100;
	var c = view.center;
	this.addBody(new CircleBody(c.x, c.y, 50, 5000, '#0033dd'));

    for (var i = 2; i < count + 2; i++) {

        var px = c.x + (i * 50) + 100;
        var py = c.y - 150;

        var body = new CircleBody(px, py, 3, 5, '#00CCFF');

        this.addBody(body);

        body.addForce(new Point(-900, -200));
    }
}


DistanceForceStrategy.prototype = Object.create(AbstractStrategy.prototype);
DistanceForceStrategy.prototype.constructor = DistanceForceStrategy;


/*
 * Override the accumulateForces method from AbstractStrategy and use
 * the distance of the bodies in the force equation.
 */
DistanceForceStrategy.prototype.accumulateForces = function () {

	var force = new Point();

	for (var i = 0; i < this.numBodies; i++) {
		var pa = this.bodies[i];

		for (var j = i + 1; j < this.numBodies; j++) {
			var pb = this.bodies[j];

			var vect = pb.curr.subtract(pa.curr);

            // only apply force if the bodies aren't touching
            if (vect.length < pb.radius + pa.radius) continue;

            force.angle = vect.angle;
            force.length = (this.gravity * pa.mass * pb.mass) / (vect.length * vect.length);

            pa.addForce(force)
            force = force.multiply(-1);
            pb.addForce(force);
		}
	}
}
