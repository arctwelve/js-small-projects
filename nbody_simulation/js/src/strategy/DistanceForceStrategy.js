"use strict";


/*
 * Strategy class that uses the distance of the bodies along with mass
 * and a gravity constant in the accumulator
 */
var DistanceForceStrategy = function () {

	AbstractStrategy.call(this, {timeStep:1/5, gravity:50, damping:0.998});

    let count = 100;
	let c = view.center;
	this.addBody(new CircleBody(c.x, c.y, 50, 5000, '#0033dd'));

    for (let i = 2; i < count + 2; i++) {

        let px = c.x + (i * 50) + 100;
        let py = c.y - 150;

        let body = new CircleBody(px, py, 3, 5, '#00CCFF');
        body.addForce(new Point(-900, -200));
        this.addBody(body);
    }
}


DistanceForceStrategy.prototype = Object.create(AbstractStrategy.prototype);
DistanceForceStrategy.prototype.constructor = DistanceForceStrategy;


/*
 * Override the accumulateForces method from AbstractStrategy and use
 * the distance of the bodies in the force equation.
 */
DistanceForceStrategy.prototype.accumulateForces = function () {

	let force = new Point();

	for (let i = 0; i < this.numBodies; i++) {
		let pa = this.bodies[i];

		for (let j = i + 1; j < this.numBodies; j++) {
			let pb = this.bodies[j];

			let vect = pb.curr.subtract(pa.curr);

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
