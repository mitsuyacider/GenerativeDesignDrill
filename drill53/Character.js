import Particle from "./Particle001.js";
import ColorPallet from "./ColorPallet.js";
export default class Character {
  constructor(points, liquid) {
    this.points = points;
    this.particles = [];

    this.createParticles();

    this.liquid = liquid;

    this.xOffset = random(0.01, 0.05);
    this.yOffset = random(0.01, 0.05);
    this.zOffset = random(0.01, 0.05);
  }

  createParticles() {
    let pallet = ColorPallet.getPallet();
    for (let i = 0; i < this.points.length; i += 10) {
      const p = this.points[i];
      const loc = createVector(p.x, p.y);
      const particle = new Particle(loc);
      particle.size = 5;
      particle.fill = random(pallet);
      this.particles.push(particle);
    }
  }

  display() {
    beginShape();

    push();
    noStroke();
    this.particles
      // .filter((particle) => !particle.gone())
      .map((particle, i) => {
        if (particle.isInside(this.liquid)) {
          // console.log("hallo");
          particle.liquidFill = "#ff0000";
          particle.drag(this.liquid);
        } else {
          // console.log("hallo");
          // const dummy = createVector(0, -10);
          particle.liquidFill = undefined;
          particle.applyForce(particle.velocity);
        }

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
