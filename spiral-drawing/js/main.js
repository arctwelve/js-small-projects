
window.onload = function () {

    paper.install(window);
    paper.setup('myCanvas');
    //var x = new Spinner();
    //x.move();

    var b = new SimplePath();

    paper.view.update();


}


var Spinner = function () {

    this.path = new Path.Rectangle([75, 75], [100, 100]);
    this.path.strokeColor = 'black';
}


Spinner.prototype.move = function () {
    var _this = this;
    view.onFrame = function (event) {
        // On each frame, rotate the path by 3 degrees
        _this.path.rotate(13);
    }
}


var SimplePath = function () {

    var pathA = new Path();

    pathA.strokeColor = 'black';
    var pointA = new Point(100, 100);
    var pointB = new Point(500, 700);
    var pointC = new Point(700, 500);

    pathA.add(pointA);
    pathA.add(pointB);
    pathA.add(pointC);

    pathA.closed = true;
    pathA.smooth();
    pathA.selected = true;

    var myCircle = new Path.Circle(new Point(100, 70), 50);
    myCircle.strokeColor = 'black';
    myCircle.selected = true;
}
