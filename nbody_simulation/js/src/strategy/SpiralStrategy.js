"use strict";


/*
 * A strategy that creates a large spiral configuration of bodies, of increasing
 * mass and size.
 */
var SpiralStrategy = function () {

    AbstractStrategy.call(this, {timeStep:1/20, gravity:0.1, damping:0.999});

    let scale = 20;
    let count = 150;
    let radCoef = 0.3;
    let mssCoef = 0.01;

    let colorA = new Color(1.0, 0.0, 1.0, 0.9);
    let colorB = new Color(1.0, 0.5, 0.0, 0.9);

    let c = view.center.clone();
    c.x -= 200;

    for (let i = 1; i <= count; i++) {

        c.x += Math.sin(i * 0.1) * scale;
        c.y += Math.cos(i * 0.1) * (scale += 1);

        let rad = i * radCoef + 1;
        let mss = i * mssCoef + 1;
        let color = (i % 2 == 0) ? colorA : colorB;

        this.addBody(new CircleBody(c.x, c.y, rad, mss, color));
    }
}


SpiralStrategy.prototype = Object.create(AbstractStrategy.prototype);
SpiralStrategy.prototype.constructor = SpiralStrategy;
