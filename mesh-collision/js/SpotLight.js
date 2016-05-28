function SpotLight() {

    var spot = new THREE.SpotLight(0xffffff);
    spot.position.set(0, 400, 0);
    spot.intensity = 0.9;
    spot.castShadow = true;
    return spot;
}