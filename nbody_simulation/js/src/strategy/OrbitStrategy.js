"use strict";


/*
 * Simple strategy of a few 'planet' bodies orbiting a central one
 */
var OrbitStrategy = function () {

	AbstractStrategy.call(this, {timeStep:1/10, gravity:0.5, damping:1.0});

	let c = view.center
	let star =   new CircleBody(c.x, c.y, 100, 300, 'orange');
	let planetA = new CircleBody(c.x, c.y + 350, 7, 0.1, 'blue');
	let planetB = new CircleBody(c.x, c.y - 250, 4, 0.09, 'red');
	let planetC = new CircleBody(c.x, c.y - 450, 10, 0.5, 'green');

	this.addBody(star);
	this.addBody(planetA);
	this.addBody(planetB);
	this.addBody(planetC);

	planetA.addForce(new Point(-200, 0));
	planetB.addForce(new Point(-100, 0));
	planetC.addForce(new Point(-800, 0));
}


OrbitStrategy.prototype = Object.create(AbstractStrategy.prototype);
OrbitStrategy.prototype.constructor = OrbitStrategy;
