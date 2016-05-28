"use strict";


/*
 * A strategy that creates a spiral configuration of bodies of increasing
 * mass and radius.
 */
var SpiralStrategy = function () {

    AbstractStrategy.call(this, {timeStep:1/15, gravity:0.1, damping:0.999});

    var scale = 20;
    var count = 99;
    var radCoef = 0.4;
    var mssCoef = 0.01;

    var colorA = new Color(1.0, 0.0, 1.0, 0.9);
    var colorB = new Color(1.0, 0.5, 0.0, 0.9);

    var c = view.center.clone();
    c.x -= 200;

    for (var i = 1; i <= count; i++) {

        c.x += Math.sin(i * 0.1) * scale;
        c.y += Math.cos(i * 0.1) * (scale += 1);

        var rad = i * radCoef + 1;
        var mss = i * mssCoef + 1;
        var color = (i % 2 == 0) ? colorA : colorB;

        this.addBody(new CircleBody(c.x, c.y, rad, mss, color));
    }
}


SpiralStrategy.prototype = Object.create(AbstractStrategy.prototype);
SpiralStrategy.prototype.constructor = SpiralStrategy;
