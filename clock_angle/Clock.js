"use strict";

/*
 * Object represents a clock, temporally and visually. The hands of the clock move
 * based on the advance of a second propery. The second property is incremented by 
 * an arbitrary rate property. 
 *
 * The clock is not meant to show current time, but to demonstrate angles of the hands
 * that are based on trig based positions - not limited to a floored 360 degree 
 * system with a fixed temporal unit of 60 seconds/minutes and 12
 */
var Clock = function () {
    
    this.rate = 2;
    this.hoursInCycle = 6;
    this.temporalUnit = 60;
    
    this.second = 0;
    this.radius = 300;
    this.strokeWidth = 15;
    
    this.face = this.drawFace('#D1DBBD', '#3E606F');
    this.hourHand = new Hand('#91AA9D', this.radius * 0.5);
    this.minuteHand = new Hand('#3E606F ', this.radius * 0.8);
    
    this.handsAngle = new HandsAngle(this.minuteHand, this.hourHand);
}


Clock.prototype.update = function () {
    
    this.second += this.rate;
    
    var invUnit = 1 / this.temporalUnit;
    var minute = invUnit * this.second;
    var hour = invUnit * this.second / this.hoursInCycle;
    
    this.minuteHand.update(minute);
    this.hourHand.update(hour);
    this.handsAngle.update();
}


Clock.prototype.drawFace = function (fillColor, strokeColor) {
    
    var p = new Path.Circle(view.center, this.radius);
	p.strokeWidth = this.strokeWidth;
	p.strokeColor = strokeColor;
	p.fillColor = fillColor;
    
    return p;
}


Clock.prototype.recenter = function () {
    this.face.position = view.center;
    this.hourHand.recenter();
    this.minuteHand.recenter();
}