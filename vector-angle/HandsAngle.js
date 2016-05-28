"use strict";

/*
 * HandsAngle models the angle between the hands of the clock. Calculates the angle 
 * and handles visualization of the angle. Makes no assumptions about the nature of
 * the hands, whether hour or minute.
 */
var HandsAngle = function (handA, handB) {

    this.radius = 140;
    this.textOffset = new Point(0, -220);

    this.handA = handA;
    this.handB = handB;

    this.thetaText = new PointText();
    this.thetaText.style = {
        fontFamily: 'Verdana',
        fontSize: 70,
        fontWeight: 900,
        fillColor: '#91AA9D',
        strokeColor:'#3E606F',
	    strokeWidth: 2,
    };

    this.thetaText.opacity = 0.3;
    handA.path.insertAbove(this.thetaText);

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
 * Calculates and draws the angle between the two vectors made by the hands
 */
HandsAngle.prototype.update = function () {

    var vA = this.handA.asNormalizedVector();
    var vB = this.handB.asNormalizedVector();
    this.drawAngleArc(vA, vB);

    var thetaAB = Math.acos(vA.dot(vB));
    this.drawAngleValue(thetaAB, vA, vB);
}


/*
 * Draws the arc of the angle between the hands
 */
HandsAngle.prototype.drawAngleArc = function (vA, vB) {

    // midline vectors between the hands on acute and obtuse sides
    var vC = vB.add(vA).divide(2).normalize();
    var vD = vB.subtract(vA).divide(2).normalize();

    // scale out the vectors to the set radius
    vA = vA.multiply(this.radius);
    vB = vB.multiply(this.radius);
    vC = vC.multiply(this.radius);
    vD = vD.multiply(this.radius);

    // create points relative to the clock center
    var handPointA = view.center.add(vA);
    var handPointB = view.center.add(vB);
    var acutePoint = view.center.add(vC);
    var obtusePoint = view.center.add(vD);

    // draw endpoint circles on the hands
    this.circleA.position = handPointA;
    this.circleB.position = handPointB;

    // draw the arc
    this.thetaPath.removeSegments();
    this.thetaPath.moveTo(handPointA);
    var targetPoint = (vA.cross(vB) < 0) ? acutePoint : obtusePoint;
    this.thetaPath.arcTo(targetPoint, handPointB);
}


/*
 * Draws the numeric value of the angle between the hands
 */
HandsAngle.prototype.drawAngleValue = function (radians, vA, vB) {

    var isAcute = (vA.cross(vB) < 0) ? true : false;
    var degrees = radians * (180 / Math.PI);
    degrees = Math.round(isAcute ? degrees : 360 - degrees);

    this.thetaText.content = degrees;

    var vc = view.center.clone();
    this.thetaText.position = vc.add(this.textOffset);
}

