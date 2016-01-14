"use strict";


var CarpetStrategy = function () {

	this.timeStep = 1/5;
	this.gravity = 0.5;
	this.damping = 0.999;
	
	var colWidth = 50;
	var rowHeight = 50;
	var newRowAtCols = 12;
	this.numBodies = 156;
	var origin = this.getCenter(rowHeight, colWidth, newRowAtCols, this.numBodies);

	var rad = 2;
	var mass = 0.1;
	var colorA = "red";
	var colorB = "orange";

	var colCount = 0;
	var p = new Point(origin);
	this.bodies = [this.numBodies];

	for (var i = 0; i < this.numBodies; i++) {

		var color = (i < this.numBodies / 2) ? colorA : colorB;
		this.bodies[i] = new CircleBody(p.x, p.y, rad, mass, color);

		p.x += colWidth;
		if (colCount++ >= newRowAtCols - 1) {
			p.x = origin.x; 
			p.y += rowHeight;
			colCount = 0;
		}
	}   
}


// any number of helper methods can be called from the constuctor
CarpetStrategy.prototype.getCenter = function (rowH, colW, newRowAt, numBodies) {

	var c = view.center;
	var halfW = ((newRowAt - 1) * colW) / 2;
	var numRows = Math.ceil(numBodies / newRowAt);
	var halfH = ((numRows - 1) * rowH) / 2;

	var cx = c.x - halfW;
	var cy = c.y - halfH;
	return new Point(cx, cy);
}