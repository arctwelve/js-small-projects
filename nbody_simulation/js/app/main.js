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
