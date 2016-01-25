"use strict";

/*
 * HandsAngle models the angle between the hands of the clock. Calculates the angle 
 * and handles visualization of the angle. Makes no assumptions about the nature of
 * the hands, whether hour or minute.
 */
var HandsAngle = function (handA, handB) {

    this.handA = handA;
    this.handB = handB;
    this.toggle = false;

    var circleAttr = {
        radius: 8,
        fillColor: '#D1DBBD'
    };
    this.circleA = new Path.Circle(circleAttr);
    this.circleB = new Path.Circle(circleAttr);

    var pathAttr = {
        strokeWidth: 10,
        strokeColor: '#193441',
        dashArray: [18, 15]
    };
    this.thetaPath = new Path(pathAttr);
}


/*  
 * 
 */
HandsAngle.prototype.update = function () {

    var len = 140;

    var vA = this.handA.asVector().normalize();
    var vB = this.handB.asVector().normalize();
    var vC = vB.add(vA).divide(2).normalize();
    var vD = vB.subtract(vA).divide(2).normalize();

    var thetaAB = Math.acos(vA.dot(vB));

    vA = vA.multiply(len);
    vB = vB.multiply(len);
    vC = vC.multiply(len);
    vD = vD.multiply(len);

    var pointA = view.center.add(vA);
    var pointB = view.center.add(vB);
    var acutePoint = view.center.add(vC);
    var obtusePoint = view.center.add(vD);

    this.circleA.position = pointA;
    this.circleB.position = pointB;

    this.thetaPath.removeSegments();

    if (vA.cross(vB) < 0) {
        this.thetaPath.moveTo(pointA);
        this.thetaPath.arcTo(acutePoint, pointB);
    } else {
        this.thetaPath.moveTo(pointA);
        this.thetaPath.arcTo(obtusePoint, pointB);
    }
}