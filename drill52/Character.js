import Particle from "./Particle003.js";
import ColorPallet from "./ColorPallet.js";
export default class Character {
  constructor(points) {
    this.points = points;
    this.particles = [];

    this.createParticles();
  }

  createParticles() {
    let pallet = ColorPallet.getPallet();
    for (let i = 0; i < this.points.length; i += 20) {
      const p = this.points[i];
      const loc = createVector(p.x, p.y);
      const particle = new Particle(loc);
      particle.fill = random(pallet);
      this.particles.push(particle);
    }
  }

  display() {
    beginShape();

    push();
    noStroke();
    this.particles
      .filter((particle) => !particle.gone())
      .map((particle, i) => {
        const wind = createVector(random(-0.001, 0.001), -0.005);
        const friction = particle.velocity.copy();
        const normal = 1;
        const coefficient = 0.5;
        const frictionMag = coefficient * normal;
        friction.mult(-1);
        friction.normalize();
        friction.mult(frictionMag);

        //

        particle.applyForce(wind);
        particle.applyForce(friction);
        particle.update();
        particle.display();
      });

    this.particles
      .filter((particle) => particle.gone())
      .map((particle, i) => {
        const index = this.particles.indexOf(particle);
        this.particles.splice(index, 1);
      });

    pop();

    if (this.particles.length <= 0) this.createParticles();
    endShape();
  }
}
