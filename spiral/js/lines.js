window.onload = function () {

    paper.install(window);
    paper.setup('myCanvas');

    var lineSpiral = new LineSpiral();
    lineSpiral.draw();
}


var LineSpiral = function() {
    this.path = new Path();
    this.path.strokeWidth = 1;
    this.path.strokeColor = new Color(1, 0, 0, 0.9);


    this.vector = new Point();
    this.position = new Point(view.center);
}


LineSpiral.prototype.draw = function () {
    var _this = this;
    view.onFrame = function (event) {

        _this.vector.length += 3;
        _this.vector.angle += 90;
        _this.position = _this.position.add(_this.vector)
        _this.path.add(_this.position);
        _this.path.smooth();

    }
}
