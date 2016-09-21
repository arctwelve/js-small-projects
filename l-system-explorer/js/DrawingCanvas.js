"use strict";


/*
 * Drawing canvas object. Takes up entire window, including space underneath control
 * panel. Object wraps html canvas -- reference to it (this.obj) is grabbed in constructor.
 */
var DrawingCanvas = function () {

    this.container = document.getElementById("drawing-canvas-container");
    this.obj = document.getElementById("drawing-canvas");
    this.ctx = this.obj.getContext("2d");

    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    this.resizeCanvas();
}


DrawingCanvas.prototype.resizeCanvas = function () {
    this.obj.width = window.innerWidth;
    this.obj.height = window.innerHeight;

    this.render();
}


DrawingCanvas.prototype.render = function () {

    this.ctx.beginPath();
    this.ctx.arc(600, 400, 150, 0, 2 * Math.PI);

    this.ctx.fillStyle = 'orange';
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = '#4499ff';
    this.ctx.stroke();

    this.ctx.stroke();
}
