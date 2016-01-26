"use strict";


var CarpetStrategy = function () {

	AbstractStrategy.call(this, {timeStep:1/100, gravity:100, damping:0.999});

	var count = 156;
	var colWidth = 50;
	var rowHeight = 50;
	var newRowAtCol = 12;
	var origin = this.getCenter(rowHeight, colWidth, newRowAtCol, count);

	var rad = 2;
	var mass = 1;
	var colorA = "red";
	var colorB = "orange";

	var colCount = 0;
	var p = new Point(origin);

	for (var i = 0; i < count; i++) {

		var color = (i < count / 2) ? colorA : colorB;
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


CarpetStrategy.prototype.getCenter = function (rowH, colW, newRowAt, numBodies) {

	var c = view.center;
	var halfW = ((newRowAt - 1) * colW) / 2;
	var numRows = Math.ceil(numBodies / newRowAt);
	var halfH = ((numRows - 1) * rowH) / 2;

	var cx = c.x - halfW;
	var cy = c.y - halfH;
	return new Point(cx, cy);
}
