/*
 * A Mesh that can be edited using the mouse to change the y height of faces.
 * Extends THREE.Mesh
 */

function EditableSurface() {

    THREE.Mesh.call(this);

    // width, height, widthSegments, heightSegments
    this.geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);

    // rotate parallel to z plane
    this.geometry.rotateX(Math.PI / 2);

    this.material = this.getMaterial();
    
    this.castShadow = true;
    this.receiveShadow = true;
}


EditableSurface.prototype = Object.create(THREE.Mesh.prototype);
EditableSurface.prototype.constructor = EditableSurface;


EditableSurface.prototype.update = function () {
    
    this.geometry.dynamic = true;
    this.geometry.colorsNeedUpdate = true;
    this.geometry.verticesNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;
    
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();
}


/*
 * Handler when the mouse is over a face
 */
EditableSurface.prototype.transformIntersect = function (face) {

    face.color.setRGB(Math.random(), Math.random(), Math.random());

    var vertA = this.geometry.vertices[face.a];
    var vertB = this.geometry.vertices[face.b];
    var vertC = this.geometry.vertices[face.c];

    vertA.setY(vertA.y + 10);
    vertB.setY(vertB.y + 10);
    vertC.setY(vertC.y + 10);

    this.update();
}



EditableSurface.prototype.getMaterial = function () {
    
    var phong = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors,
        shininess: 30
    });

    var lambert = new THREE.MeshLambertMaterial({
        color: 0x336699,
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

    return lambert;
}






/*
this.geometry.computeFaceNormals();
this.geometry.computeVertexNormals();
this.geometry.verticesNeedUpdate = true;
this.geometry.normalsNeedUpdate = true; 
*/



/*
 * 
 * if ( intersects.length > 0 ) {
    var faceIndex = intersects[0].faceIndex;
    var obj = intersects[0].object;
    var geom = obj.geometry;
    var faces = obj.geometry.faces;
    var facesIndices = ["a","b","c"];
    facesIndices.forEach(function(indices){
        geom.vertices[faces[faceIndex][indices]].setZ(-10);
    });
    if(faceIndex%2 == 0){
        faceIndex = faceIndex+1;
    }else{
        faceIndex = faceIndex-1;
    }
    facesIndices.forEach(function(indices){
        geom.vertices[faces[faceIndex][indices]].setZ(-10);
    }); 
    geom.verticesNeedUpdate = true;                               
}
*
*/