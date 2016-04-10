"use strict";

/*
 * Object represents a clock, temporally and visually. The hands of the clock move
 * based on the advance of a 'second' propery. The 'second' property is incremented by
 * an arbitrary 'rate' property. For accurate time the rate could just be connected to
 * the system clock.
 *
 * The example isn't meant to show the current time, but to demonstrate accurate angles of the
 * hands based on simple vector methods. Variable time units work correctly (e.g., a day can
 * be 5.2 'hours' long and an minute can be 20.33 'seconds' instead of 60). This shows the
 * benefit of solving for the general case instead of a naive arithmetic solution.
 */
var Clock = function () {
    
    this.rate = 1;                     // increments the second property
    this.temporalUnit = 50.3;           // represents the sum units of both minutes and hours
    this.hoursInCycle = 14.2;           // number of hours in a clock cycle
    
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
