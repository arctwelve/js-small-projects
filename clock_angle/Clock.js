"use strict";

/*
 * Object represents a clock, temporally and visually. The hands of the clock move
 * based on the advance of a 'second' propery. The 'second' property is incremented by
 * an arbitrary 'rate' property. For accurate time the 'rate' could just be connected
 * or replaced by the system clock second.
 *
 * The example isn't meant to show the current time, but to demonstrate accurate angles of the
 * hands based on simple vector methods. Variable time units work correctly (e.g., a day can
 * be 5.2 hours long and a minute can be 20.33 seconds).
 */
var Clock = function () {
    
    this.rate = 1;                      // increments the second property
    this.temporalUnit = 50.3;           // represents the sum units of both minutes and hours
    this.hoursInCycle = 14.2;           // number of hours in a clock cycle
    
    this.second = 0;
    this.radius = 300;
    this.strokeWidth = 15;
    
    this.face = this.createFace('#D1DBBD', '#3E606F');
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


Clock.prototype.createFace = function (fillColor, strokeColor) {
    
    var face = new Path.Circle(view.center, this.radius);
	face.strokeWidth = this.strokeWidth;
	face.strokeColor = strokeColor;
	face.fillColor = fillColor;
    
    return face;
}


Clock.prototype.recenter = function () {
    this.face.position = view.center;
    this.hourHand.recenter();
    this.minuteHand.recenter();
}
