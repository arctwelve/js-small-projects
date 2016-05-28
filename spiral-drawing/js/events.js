window.onload = function () {

    paper.install(window);
    paper.setup('myCanvas');

    var eventTest = new EventTest();

}


var EventTest = function() {

    var tool = new Tool();

    tool.onMouseDown = function (event) {
        console.log(event.point);
    }

    tool.onMouseDrag = function (event) {
        console.log(event.point);
    }

    tool.onMouseUp = function (event) {
        console.log(event.point);
    }
}

