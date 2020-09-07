import Particle002 from "./Particle002.js";
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
      const particle = new Particle002(loc);
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
        particle.applyForce(wind);
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
