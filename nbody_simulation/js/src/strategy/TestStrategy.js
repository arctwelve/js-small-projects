"use strict";


var TestStrategy = function () {

	AbstractStrategy.call(this, {timeStep:1/10, gravity:3, damping:1.0});

	var c = view.center

	var planetA = new CircleBody(c.x, c.y + 100, 5, 0.5, 'blue');
	var planetB = new CircleBody(c.x, c.y, 5, 0.5, 'red');
	var planetC = new CircleBody(c.x, c.y - 400, 5, 0.5, 'green');

	this.bodies.push(planetA);
	this.bodies.push(planetB);
	this.bodies.push(planetC);
	this.numBodies = this.bodies.length;

	//planetA.addForce(new Point(-200, 0));
	//planetB.addForce(new Point(-100, 0));
	//planetC.addForce(new Point(-800, 0));
}


TestStrategy.prototype = Object.create(AbstractStrategy.prototype);
TestStrategy.prototype.constructor = OrbitStrategy;
