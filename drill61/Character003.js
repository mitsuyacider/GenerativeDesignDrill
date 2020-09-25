import Particle004 from "./Particle004.js";
import ColorPallet from "./ColorPallet.js";
import Attractor from "./Attractor.js";

export default class Character003 {
  constructor(points, liquid, bounds) {
    this.points = points;
    this.particles = [];

    this.createParticles();

    this.liquid = liquid;

    this.xOffset = random(0.01, 0.05);
    this.yOffset = random(0.01, 0.05);
    this.zOffset = random(0.01, 0.05);

    this.bounds = bounds;

    const pos = createVector(bounds.x + bounds.w, bounds.y + bounds.h / 2);
    this.attractor = new Attractor(pos);
  }

  createParticles() {
    let pallet = ColorPallet.getPallet();
    for (let i = 0; i < this.points.length; i += 50) {
      const p = this.points[i];
      const loc = createVector(p.x, p.y);
      const particle = new Particle004(loc, random(1, 5));

      particle.fill = random(pallet);
      this.particles.push(particle);
    }
  }

  display() {
    // noStroke();
    beginShape();
    push();
    strokeWeight(1);
    this.particles.map((particle, i) => {
      const force = this.attractor.attract(particle);

      particle.applyForce(force);

      particle.update();
      particle.display();
      particle.checkEdge();
      curveVertex(particle.pos.x, particle.pos.y);
    });

    pop();

    if (this.particles.length <= 0) this.createParticles();
    endShape(CLOSE);

    this.yOffset += 0.0001;
  }
}
