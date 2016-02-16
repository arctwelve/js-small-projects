"use strict";


/*
 * Strategy with an arrangment of particles in a carpet-like grid.
 */
var CarpetStrategy = function () {

    AbstractStrategy.call(this, {timeStep: 1/100, gravity: 100, damping: 0.999});

    let count = 156;
    let colWidth = 50;
    let rowHeight = 50;
    let newRowAtCol = 12;
    let origin = this.getCenter(rowHeight, colWidth, newRowAtCol, count);

    let rad = 2;
    let mass = 1;
    let colorA = "red";
    let colorB = "orange";

    let colCount = 0;
    let p = new Point(origin);

    for (let i = 0; i < count; i++) {

        let color = (i < count / 2) ? colorA : colorB;
        this.addBody(new CircleBody(p.x, p.y, rad, mass, color));

        p.x += colWidth;
        if (colCount++ >= newRowAtCol - 1) {
            p.x = origin.x;
            p.y += rowHeight;
            colCount = 0;
        }
    }
}


CarpetStrategy.prototype = Object.create(AbstractStrategy.prototype);
CarpetStrategy.prototype.constructor = CarpetStrategy;


/*
 * Returns the centerpoint of the carpet grid
 */
CarpetStrategy.prototype.getCenter = function (rowH, colW, newRowAt, numBodies) {

    let c = view.center;

    let halfW = ((newRowAt - 1) * colW) / 2;
    let numRows = Math.ceil(numBodies / newRowAt);
    let halfH = ((numRows - 1) * rowH) / 2;

    let cx = c.x - halfW;
    let cy = c.y - halfH;
    return new Point(cx, cy);
}
