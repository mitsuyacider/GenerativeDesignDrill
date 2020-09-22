import Particle001 from "./Particle001.js";
import ColorPallet from "./ColorPallet.js";
import Attractor from "./Attractor.js";

export default class Character002 {
  constructor(points, liquid, bounds) {
    this.points = points;
    this.particles = [];

    this.createParticles();

    this.liquid = liquid;

    this.xOffset = random(0.01, 0.05);
    this.yOffset = random(0.01, 0.05);
    this.zOffset = random(0.01, 0.05);

    this.bounds = bounds;

    this.attractor = new Attractor();
  }

  createParticles() {
    let pallet = ColorPallet.getPallet();
    for (let i = 0; i < this.points.length; i += 50) {
      const p = this.points[i];
      const loc = createVector(p.x, p.y);
      const particle = new Particle001(loc, random(5, 10));

      particle.fill = random(pallet);
      this.particles.push(particle);
    }
  }

  display() {
    // noStroke();
    beginShape();
    push();

    this.particles.map((particle, i) => {
      const force = this.attractor.attract(particle);

      particle.applyForce(force);

      particle.update();
      particle.display();
      particle.checkEdge();
    });

    pop();

    if (this.particles.length <= 0) this.createParticles();
    endShape();

    this.yOffset += 0.0001;
  }
}
