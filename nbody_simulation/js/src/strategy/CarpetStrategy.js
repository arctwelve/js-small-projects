"use strict";


/*
 * Strategy with an arrangment of particles in a carpet-like grid.
 */
var CarpetStrategy = function () {

    AbstractStrategy.call(this, {timeStep: 1/100, gravity: 100, damping: 0.999});

     count = 156;
     colWidth = 50;
     rowHeight = 50;
     newRowAtCol = 12;
     origin = this.getCenter(rowHeight, colWidth, newRowAtCol, count);

     rad = 2;
     mass = 1;
     colorA = "red";
     colorB = "orange";

     colCount = 0;
     p = new Point(origin);

    for ( i = 0; i < count; i++) {

         color = (i < count / 2) ? colorA : colorB;
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

     c = view.center;

     halfW = ((newRowAt - 1) * colW) / 2;
     numRows = Math.ceil(numBodies / newRowAt);
     halfH = ((numRows - 1) * rowH) / 2;

     cx = c.x - halfW;
     cy = c.y - halfH;
    return new Point(cx, cy);
}
