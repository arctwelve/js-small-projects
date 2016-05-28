function Camera () {
    
    var camera = new THREE.PerspectiveCamera(
        70, window.innerWidth / window.innerHeight, 1, 4000);
    
    camera.position.z = 500;
    camera.position.x = 0;
    camera.position.y = 600;
    
    return camera;
}