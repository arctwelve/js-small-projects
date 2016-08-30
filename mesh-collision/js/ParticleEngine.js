
var ParticleEngine = function(scene, numParticles) {
    this.scene = scene;
    this.particles = [];
    this.numParticles = numParticles;

    this.createParticles(this.numParticles);
}


ParticleEngine.prototype.createParticles = function(n) {

    for (var j = 0; j < n; j++) {
        var p = new Particle(new THREE.Vector3(), {
            mass: 1,
            radius: 3,
            color: 0xffff * Math.random()
        });

        p.addForce(new THREE.Vector3(
            Math.random(),
            Math.random() * 400,
            Math.random()
        ));

        this.particles.push(p);
        this.scene.add(p);
    }
}


ParticleEngine.prototype.update = function() {
    for (var j = 0; j < this.particles.length; j++) {
        this.particles[j].update();
    }
}
