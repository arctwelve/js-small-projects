"use strict";

THREE.KeyboardControls = function(domElement, camera) {

    this.acceleration = 0.25;
    this.domElement = (domElement === undefined) ? document : domElement;
    this.camera = camera;

    this.isKeyForward = false;
    this.isKeyBackward = false;
    this.isKeyLeft = false;
    this.isKeyRight = false;

    this.velocityZ = 0;

    this.domElement.addEventListener('keyup', this.onKeyUp.bind(this), false);
    this.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
}


THREE.KeyboardControls.prototype.update = function() {

    if (this.isKeyForward === true) {
        this.velocityZ += this.acceleration;
    } else if (this.isKeyForward === false && this.velocityZ > 0) {
        this.velocityZ -= this.acceleration;
    } else if (this.isKeyBackward === true) {
        this.velocityZ -= this.acceleration;
    } else if (this.isKeyBackward === false && this.velocityZ < 0) {
        this.velocityZ += this.acceleration;
    }

    this.camera.position.z += this.velocityZ;
}


THREE.KeyboardControls.prototype.onKeyDown = function(event) {

    switch (event.keyCode) {

        case 87: // w
            this.isKeyForward = true;
            break;
        case 83: // s
            this.isKeyBackward = true;
            break;
        case 65: // a
            this.isKeyLeft = true;
            break;
        case 68: // d
            this.isKeyRight = true;
            break;
    }
}


THREE.KeyboardControls.prototype.onKeyUp = function(event) {

    switch (event.keyCode) {
        case 87: // w
            this.isKeyForward = false;
            break;
        case 83: // s
            this.isKeyBackward = false;
            break;
        case 65: // a
            this.isKeyLeft = true;
            break;
        case 68: // d
            this.isKeyRight = true;
            break;
    }
}
