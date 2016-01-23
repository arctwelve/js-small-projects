"use strict";

/*
 * HandsAngle models the angle between the hands of the clock. Calculates the angle 
 * and handles visualization of the angle. Makes no assumptions about the nature of
 * the hands, whether hour or minute.
 */
var HandsAngle = function(color, handA, handB) {
    
    this.handA = handA;
    this.handB = handB;
    
    this.circA = new Path.Circle({radius: 4, fillColor: 'red'}); 
    this.circB = new Path.Circle({radius: 4, fillColor: 'red'}); 
    this.circC = new Path.Circle({radius: 4, fillColor: 'orange'}); 
}


/*
 * 
 */
HandsAngle.prototype.update = function () {
    
    var vA = this.handA.asVector().normalize();
    var vB = this.handB.asVector().normalize();
    var vC = vA.add(vB).divide(2).normalize();
    
    var len = 100;
    var pointA = view.center.add(vA.multiply(len));
    var pointB = view.center.add(vB.multiply(len));
    var pointC = view.center.add(vC.multiply(len));
    
    this.circA.position = pointA;
    this.circB.position = pointB;
    this.circC.position = pointC;
    
    var angleBetween = Math.acos(vA.dot(vB));
}