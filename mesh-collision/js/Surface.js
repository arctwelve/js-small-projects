function Surface() {

    THREE.Mesh.call(this);

    var yFuncText = "sin(sqrt(a*x^2  + b*z^2))";

    var xMin = -80;
    var xMax = 80;
    var zMin = -40;
    var zMax = 40;
    var yScale = 4;

    var a = .1;
    var b = .1;
    var segments = 120;

    var xRange = xMax - xMin;
    var zRange = zMax - zMin;
    var yFunc = Parser.parse(yFuncText).toJSFunction(['z', 'x', 'a', 'b']);

    var meshFunction = function (z, x) {
        z = zRange * z + zMin;
        x = xRange * x + xMin;
        var y = yFunc(z, x, a, b) * yScale;
        return new THREE.Vector3(x, y, z);
    };

    var shinyMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 50

    });
    
    this.geometry = new THREE.ParametricGeometry(meshFunction, segments, segments);
    this.geometry.scale(10, 10, 10);
    this.material = shinyMaterial;
}

Surface.prototype = Object.create(THREE.Mesh.prototype);
Surface.prototype.constructor = Surface;


Surface.prototype.update = function() {
     this.geometry.colorsNeedUpdate = true;
     this.geometry.verticesNeedUpdate = true;
}

Surface.prototype.transformIntersect = function(face) {
    
    face.color.setRGB(Math.random(), Math.random(), Math.random());
    
    var vertA = this.geometry.vertices[face.a];
    var vertB = this.geometry.vertices[face.b];
    var vertC = this.geometry.vertices[face.c];
    
    vertA.setY(vertA.y + 10);
    vertB.setY(vertB.y + 10);
    vertC.setY(vertC.y + 10);
    
    this.update(); 
}
/*
 var wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x000088,
        wireframe: true,
        side: THREE.BackSide
    });
*/