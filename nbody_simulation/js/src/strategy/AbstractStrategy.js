"use strict";


var AbstractStrategy = function (args) {

    if (!(this instanceof AbstractStrategy)) {
        throw new TypeError('Cannot call a class as a function');
    }

    if (this.constructor === AbstractStrategy) {
        throw new TypeError('Abstract class "AbstractStrategy" cannot be instantiated directly.');
    }

    this.gravity = args["gravity"];
    this.damping = args["damping"];
    this.timeStep = args["timeStep"];
    this.dt2 = Math.pow(this.timeStep, 2);

    this.bodies = [];
    this.numBodies = 0;
}


AbstractStrategy.prototype.addBody = function (b) {
    this.bodies.push(b);
    this.numBodies = this.bodies.length;
}


AbstractStrategy.prototype.getBodies = function () {
    return this.bodies;
}


AbstractStrategy.prototype.getNumBodies = function () {
    return this.numBodies;
}


AbstractStrategy.prototype.simulate = function () {
    this.accumulateForces();
    this.integrate();
}


AbstractStrategy.prototype.integrate = function () {
    for (var i = 0; i < this.numBodies; i++) {
        this.bodies[i].integrate(this.dt2, this.damping);
    }
}


/*
 * By default, classes that extend AbstractStrategy inherit this 
 * method. It's a simplified accumulator, in that the distance of
 * the bodies isn't used in the force equation -- just gravity and
 * the mass of the bodies. 
 * 
 * The DistanceForceStrategy.js class shows how you can optionally 
 * override this method and change its behavior. In 
 * DistanceForceStrategy.js the method does use the full universal
 * law of gravity, where the distance of the bodies is taken into 
 * account, along with body mass and gravity.
 * 
 * Another concrete Strategy class could override this method and use a
 * completely different technique for accumulating forces. You could
 * implement an n-body strategy that used Barnes-Hut to get better
 * performance. Or if you needed to toggle the strategies to an 'off'
 * state you could override this method and leave the body of it empty
 */
AbstractStrategy.prototype.accumulateForces = function () {

    var force = new Point();

    for (var i = 0; i < this.numBodies; i++) {
        var pa = this.bodies[i];

        for (var j = i + 1; j < this.numBodies; j++) {
            var pb = this.bodies[j];

            var vect = pb.curr.subtract(pa.curr);
            force.angle = vect.angle;
            force.length = this.gravity * pa.mass * pb.mass;

            pa.addForce(force)
            force = force.multiply(-1);
            pb.addForce(force);

        }
    }
}
