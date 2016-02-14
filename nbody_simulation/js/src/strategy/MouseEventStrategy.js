"use strict";

/*
 *
 */
var MouseEventStrategy = function () {

    AbstractStrategy.call(this, { timeStep: 1/25, gravity: 0.1, damping: 0.97 });

    let count = 150;
    let c = view.center;

    for (let i = 2; i < count + 2; i++) {

        let px = c.x + (i * 50) + 100;
        let py = c.y - 150;

        let body = new CircleBody(px, py, 5, 5, "yellow");
        body.addForce(new Point(-900, -200));
        this.addBody(body);
    }

    this.mouseMass = 10000;
    this.mouseBody = new CircleBody(c.x, c.y, 0, this.mouseMass, "black");
    this.addBody(this.mouseBody);

    this.mousePoint = new Point();
    this.createMouseEvents();
}


/*
 * MouseEventStrategy extends AbtractStrategy
 */
MouseEventStrategy.prototype = Object.create(AbstractStrategy.prototype);
MouseEventStrategy.prototype.constructor = MouseEventStrategy;


/*
 * Override the accumulateForces method from AbstractStrategy and track the mouse location.
 * Notice that, in contrast to the DistanceForceStategy, we're calling the default base method
 * first and just adding a little onto it.
 */
MouseEventStrategy.prototype.accumulateForces = function () {
    AbstractStrategy.prototype.accumulateForces.call(this);
    this.mouseBody.position = this.mousePoint;
}


/*
 * Add mouse events. Note that the context is responsible for cleaning up events each
 * time a new strategy is loaded
 */
MouseEventStrategy.prototype.createMouseEvents = function () {

    let $this = this;

    view.on('mousedown', function (event) {
        $this.mouseBody.setMass($this.mouseMass * -0.5);
        document.body.style.cursor = "crosshair";
    });

    view.on('mousemove', function (event) {
        $this.mousePoint = event.point;
    });

    view.on('mouseup', function (event) {
        $this.mouseBody.setMass($this.mouseMass);
        document.body.style.cursor = "default";
    });
}
