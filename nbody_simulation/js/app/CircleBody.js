"use strict";

define(function () {
    
    var CircleBody = function (x, y, r, m, color) {
       
        this.radius = r;
        this.mss = m;
        this.invMass = 1 / m;

        // current and previous positions
        this.curr = new Point(x, y);
        this.prev = new Point(x, y);
        this.forces = new Point();

        // graphic element, decoupled from math and physics attributes 
        this.g = new Path.Circle(this.curr, this.radius);
        this.g.fillColor = color;
        this.g.strokeColor = color;
        this.g.strokeWidth = 1; 
    }

    
    CircleBody.prototype = {
        get velocity() {
            return this.curr.subtract(this.prev);
        }, 
        set velocity(v) {
            this.prev = curr.subtract(v);       
        },
        get mass() {
            return this.mss;
        },
        set mass(m) {
            this.mss = m;
        }
    }


    CircleBody.prototype.integrate = function (dt2, damping) {

        var temp = this.curr.clone();

        var nv = this.velocity.add(this.forces.multiply(dt2));
        this.curr = this.curr.add(nv.multiply(damping))
        this.prev = temp.clone();

        this.forces = new Point();
    }


    CircleBody.prototype.addForce = function (f) {
        this.forces = this.forces.add(f.multiply(this.invMass));
    }


    CircleBody.prototype.draw = function () {
        this.g.position = this.curr;
    }

    return CircleBody;   
});