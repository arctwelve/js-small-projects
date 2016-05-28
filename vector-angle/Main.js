"use strict";

/*
 * Main object initializes paper.js' canvas, instantiates the Clock and handles the app event loop.  
 */
var Main = function () {
    this.initCanvas();
    this.clock = new Clock();
    this.run();
}


Main.prototype.run = function () {
	
    var _this = this;
	
    view.onFrame = function (event) {
		_this.clock.update();
	}
    
    view.onResize = function (event) {
        _this.clock.recenter();
    }
}


Main.prototype.initCanvas = function () {
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	paper.install(window);
}