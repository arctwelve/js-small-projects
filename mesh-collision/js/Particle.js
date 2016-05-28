"use strict";


/*
 * Particle class extends THREE.Mesh. Due to protection of internals in Three.js we don't directly assign the inhertited
 * this.position property. Instead the Vector3 this.curr is used for operations and the it'c copied to this.position
 */
var Particle = function (positionVector, props) {

    THREE.Mesh.call(this);
    
    this.radius = props.radius;
    this.setMass(props.mass);

    this.timeStep = 1/100;
    this.gravity = new THREE.Vector3(0, -1, 0);
    this.damping = 0.999;

    this.curr = positionVector.clone();
    this.prev = positionVector.clone();

    this.forces = new THREE.Vector3();
    this.velocity = new THREE.Vector3();

    this.position.copy(this.curr);

    this.geometry = new THREE.SphereGeometry(this.radius, 10, 10);
    this.material = this.getMaterial({
        color: props.color
    });
}


Particle.prototype = Object.create(THREE.Mesh.prototype);
Particle.prototype.constructor = Particle;


Particle.prototype.getMaterial = function (props) {
    return new THREE.MeshPhongMaterial({
        color: props.color
    });
}


Particle.prototype.addForce = function (vf) {
    this.forces = this.forces.add(vf.multiplyScalar(this.invMass));
}


Particle.prototype.update = function () {
    this.addForce(this.gravity);
    this.position.copy(this.curr);
    this.integrate(this.timeStep, this.damping);
}


Particle.prototype.integrate = function (dt2, damping) {

    var temp = this.curr.clone();

    this.velocity.subVectors(this.curr, this.prev);
    this.forces.multiplyScalar(dt2)
    
    this.velocity.add(this.forces);

    this.velocity.multiplyScalar(damping)
    this.curr.add(this.velocity);

    this.prev = temp.clone();
    this.forces = new THREE.Vector3();
}


Particle.prototype.setMass = function (m) {
    if (m === 0) m = 0.0001;
    this.mass = m;
    this.invMass = 1 / m;
}
