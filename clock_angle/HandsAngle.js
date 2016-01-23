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
 * the angle between two normalized vectors, is the arccos of their dot product
 */
HandsAngle.prototype.update = function () {
    
    var vA = this.handA.asVector().normalize();
    var vB = this.handB.asVector().normalize();
    var angleBetween = Math.acos(vA.dot(vB));
    
    var len = 120;
    var pointA = view.center.add(vA.multiply(len));
    var pointB = view.center.add(vB.multiply(len));
    var midPoint = view.center.add(vA.add(vB).divide(2).multiply(len));
    
    this.circA.position = pointA;
    this.circB.position = pointB;
    this.circC.position = midPoint;
}