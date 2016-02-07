window.onload = function () {

    paper.install(window);
    paper.setup('myCanvas');

    createCircles();
    paper.view.update();

}


function createCircles() {

    var radius = 10;
    var ctr = view.center;
    var cp = new Point();

    for (var i = 0; i < 200; i++) {
        cp.length = i * 1.14;
        cp.angle = i * 3.14;
        cp = cp.add(ctr);

        var c = new Path.Circle(cp, radius + (i / 2));
        //c.strokeColor = new Color(1 , 0, 0);
        //c.strokeColor.hue = i * .20;
        c.fillColor = new Color(1 , 0, 0, 0.1);
        c.fillColor.hue = i / 10;


        //c.strokeWidth = 1;
    }
}
