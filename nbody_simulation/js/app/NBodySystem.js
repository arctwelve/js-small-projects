"use strict";


/*
"use strict";


requirejs.config({
    
    baseUrl: 'js/lib',
   
    paths: {
        app:'../app',   
        strats:'../strategies'
    }
});


define(function (require) {
    
    var paper = require('paper');  
    var Engine = require('app/Engine');
    var Strategy = require('strats/NBodyStrategy'); 
    
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    paper.install(window);

    new Engine(new Strategy()).run();
});
*/



/**
 * NBodySystem is a simple top level class that has three simple, decoupled responsibilities:
 * run, draw, and exectute strategy. 
 * 
 * Notice that at no point is *how* anything is run, drawn, or what strategy
 * is used. That responsibility is left up to the lower level class implementations.
 * 
 * Alec Cove, 2016
 */

var NBodySystem = function (strategy) {

	this.bodies = strategy.bodies;
	this.numBodies = this.bodies.length;
	this.strategy = strategy;
}


NBodySystem.prototype.run = function () {

	var _this = this;
	view.onFrame = function(event) {
		_this.executeStrategy();
		_this.draw();
	}    
}


NBodySystem.prototype.executeStrategy = function () {
	this.strategy.execute();
}


NBodySystem.prototype.draw = function () {
	for (var i = 0; i < this.numBodies; i++) {
		var b = this.bodies[i];
		b.draw();                
	}       
}
