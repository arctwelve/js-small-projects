"use strict";

/*
 * Main object takes care of initializing paper.js' canvas, creates the Clock and handles
 * the program event loop.  
 */
var Main = function () {
    this.initCanvas();
    this.clock = new Clock();
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