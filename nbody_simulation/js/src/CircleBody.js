"use strict";


/*
 * Circle shaped body used in the simulator.
 *
 * Each CircleBody handles its physical simulation through
 * a verlet integrator in its integrate(...) method.
 *
 * The strategy classes decide the initial location, mass and
 * color of each CircleBody -- and apply forces on the bodies.
 */
var CircleBody = function (x, y, radius, mass, color) {

	this.radius = radius;
	this.mass = mass;
	this.invMass = 1 / mass;

	this.curr = new Point(x, y);
	this.prev = new Point(x, y);
	this.forces = new Point();

	this.g = new Path.Circle(this.curr, this.radius);
	this.g.fillColor = color;
	this.g.strokeColor = color;
	this.g.strokeWidth = 1;
}


CircleBody.prototype = {
	get velocity() {
		return this.curr.subtract(this.prev);
	},
	set velocity(v) {
		this.prev = curr.subtract(v);
	},
    set position(p) {
        this.prev = p;
        this.curr = p;
    }
}


CircleBody.prototype.integrate = function (dt2, damping) {

	var temp = this.curr.clone();

	var nv = this.velocity.add(this.forces.multiply(dt2));
	this.curr = this.curr.add(nv.multiply(damping))
	this.prev = temp.clone();

	this.forces = new Point();
}


CircleBody.prototype.addForce = function (f) {
	this.forces = this.forces.add(f.multiply(this.invMass));
}


CircleBody.prototype.draw = function () {
	this.g.position = this.curr;
}


CircleBody.prototype.setMass = function (m) {
	if (m === 0) m = 0.0001;
    this.mass = m;
    this.invMass = 1 / m;
}
