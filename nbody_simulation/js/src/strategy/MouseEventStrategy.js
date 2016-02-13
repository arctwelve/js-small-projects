"use strict";


var MouseEventStrategy = function () {

    AbstractStrategy.call(this, {
        timeStep: 1 / 20,
        gravity: 0.1,
        damping: 0.999
    });

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
    this.createMouseEvents();
}


/*
 * MouseEventStrategy extends AbtractStrategy
 */
MouseEventStrategy.prototype = Object.create(AbstractStrategy.prototype);
MouseEventStrategy.prototype.constructor = MouseEventStrategy;


MouseEventStrategy.prototype.createMouseEvents = function () {

    var myCircle = new Path.Circle(view.center, 150);
    myCircle.fillColor = new Color(0.0, 0.0, 0.0, 0.0);

    //let pat = project.activeLayer.tool = new Tool();

    myCircle.onMouseDown = function (event) {
        console.log("d");
    }

    myCircle.onMouseDrag = function (event) {
        console.log(event.point);
    }
}
