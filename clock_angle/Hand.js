"use strict";

/*
 * Represents a hand on the clock. Used for both hour and minute. 
 */
var Hand = function (color, size) {
    
    var p = new Path();
    
    p.strokeWidth = 25;
	p.strokeColor = color;
    p.strokeCap = 'round';
    
    p.shadowColor = new Color(0, 0, 0),
    p.shadowBlur = 12,
    p.shadowOffset = new Point(5, 5)
    
    p.add(view.center);
    p.add(new Point(view.center.x, view.center.y - this.size));
    
    this.size = size;
    this.path = p;
}


/*
 * Updates the hand by moving its endpoint. the angle t accepts a value in radians.
 */
Hand.prototype.update = function (t) {
    
    var endPoint = this.path.lastSegment.point;
    
    endPoint.x = view.center.x + Math.sin(t) * this.size;
    endPoint.y = view.center.y - Math.cos(t) * this.size;
}


Hand.prototype.asVector = function() {
    return new Point(this.path.segments[1].point.subtract(this.path.segments[0].point))
}


/*
 * Adjusts the center point of the hand when the window is resized
 */
Hand.prototype.recenter = function () {
    this.path.firstSegment.point = view.center;
}