/*
 * A Mesh within inital PlaneGeometry that can be edited to change the 
 * position and color of its faces.
 */

function EditableSurface() {

    THREE.Mesh.call(this);

    // raycaster for mouse/mesh intersectiom
    this.raycaster = new THREE.Raycaster();

    // width, height, widthSegments, heightSegments
    this.geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    this.geometry.scale(3, 3, 1);

    // rotate parallel to z plane
    this.geometry.rotateX(Math.PI / 2);

    this.material = this.getMaterial();

    this.castShadow = true;
    this.receiveShadow = true;

    // used to prevent flicker on current face
    this.lastFace = null;

    this.elevationAmt = 10;

    this.initColor();
}


EditableSurface.prototype = Object.create(THREE.Mesh.prototype);
EditableSurface.prototype.constructor = EditableSurface;



EditableSurface.prototype.initColor = function() {
    for (var i = 0; i < this.geometry.faces.length; i++) {
        face = this.geometry.faces[i];
        face.color.setRGB(0, 0.1, 1);
    }
}


EditableSurface.prototype.update = function() {

    //this.geometry.dynamic = true;
    this.geometry.colorsNeedUpdate = true;
    this.geometry.verticesNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;

    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();


    this.material.needsUpdate = true;
}


/*
 * Handler when the mouse is over a face
 */
EditableSurface.prototype.respondToMouseLocation = function(mouse, camera) {

    // need to get verts within circle

    this.raycaster.setFromCamera(mouse, camera);
    var intersects = this.raycaster.intersectObject(this);

    if (intersects.length === 1) {
        var face = intersects[0].face;
        var faceIndex = intersects[0].faceIndex;

        if (face !== this.lastFace) {
            this.alterFace(face, faceIndex);
            this.lastFace = face;
        }
    }
}


/*
 * Handler when the mouse is over a face
 */
EditableSurface.prototype.alterFace = function(face, faceIndex) {

    var c = (faceIndex % 2 == 0) ? 1 : -1;

    // grass color
    var grassCol = new THREE.Color(0x2B9129);
    // granite color
    var graniteCol = new THREE.Color(0x838589);
    // snowpeak color
    var snowpeakCol = new THREE.Color(0xffffff);


    var vertA = this.geometry.vertices[face.a];
    var vertB = this.geometry.vertices[face.b];
    var vertC = this.geometry.vertices[face.c];

    vertA.setY(vertA.y + this.elevationAmt);
    vertB.setY(vertB.y + this.elevationAmt);
    vertC.setY(vertC.y + this.elevationAmt);


    vertA = this.geometry.vertices[face.a + c];
    vertB = this.geometry.vertices[face.b + c];
    vertC = this.geometry.vertices[face.c + c];
    
    vertA.setY(vertA.y + this.elevationAmt);
    vertB.setY(vertB.y + this.elevationAmt);
    vertC.setY(vertC.y + this.elevationAmt);


    if (vertA.y > 200 && vertB.y > 200 && vertC.y > 200) {
        this.geometry.faces[faceIndex].color.set(snowpeakCol);
        this.geometry.faces[faceIndex + c].color.set(snowpeakCol);
    } else if (vertA.y > 100 && vertB.y > 100 && vertC.y > 100) {
        this.geometry.faces[faceIndex].color.set(graniteCol);
        this.geometry.faces[faceIndex + c].color.set(graniteCol);
    } else if (vertA.y > 1 && vertB.y > 1 && vertC.y > 1) {
        this.geometry.faces[faceIndex].color.set(grassCol);
        this.geometry.faces[faceIndex + c].color.set(grassCol);
    }

    this.update();
}


EditableSurface.prototype.getMaterial = function() {

    var mat = new THREE.MeshPhongMaterial({

        vertexColors: THREE.FaceColors,
        side: THREE.BackSide
    });

    //mat.color.setHSL(0.095, 1, 0.75);

    //return mat;


    var mat2 = new THREE.MeshLambertMaterial({
        color: 0xC08A2B,
        vertexColors: THREE.FaceColors,
        side: THREE.BackSide
    });



    var mat3 = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

    var parameters = { color: 0xff1100, shading: THREE.FlatShading, side: THREE.BackSide, vertexColors: THREE.FaceColors };
    var mat4 = new THREE.MeshBasicMaterial(parameters);


    return mat;
}







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
