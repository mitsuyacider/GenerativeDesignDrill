import Particle from "./Particle001.js";
import ColorPallet from "./ColorPallet.js";
import Attractor from "./Attractor.js";

export default class Character {
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
    for (let i = 0; i < this.points.length; i += 100) {
      const p = this.points[i];
      const loc = createVector(p.x, p.y);
      const particle = new Particle(loc, random(5, 10));
      particle.size = 5;
      particle.fill = random(pallet);
      this.particles.push(particle);
    }
  }

  display() {
    // noStroke();
    strokeWeight(1);

    // const vec = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
    // const len = vec.mag();

    const xx = Math.floor(cos(90) * this.points[0].x);
    const x = this.points[0].x;
    const y = this.points[0].y;
    const gradient = drawingContext.createLinearGradient(
      xx,
      -50,
      y + 0,
      y + 500
    );
    gradient.addColorStop(0, `rgb(0, 255, 0)`);
    gradient.addColorStop(0.25, "rgba(255, 200, 0)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255)");
    gradient.addColorStop(0.75, "rgba(255, 0, 255)");
    gradient.addColorStop(1, `rgb(0, 0, 255)`);

    drawingContext.fillStyle = gradient;

    // if (this.liquidFill) {
    //   // console.log("hallo", this.liquidFill);
    //   fill(255, 0, 0);
    // }

    // // Add three color stops
    // const c = this.hexToRgb(this.fill);
    // if (c) {
    //   // const g = this.hexToRgb(this.gradient);
    // }

    // fill(255, 100, 100);
    // noStroke();

    drawingContext.shadowColor = color(255, 0, 0);
    drawingContext.shadowBlur = 15;
    // drawingContext.filter = "blur(2px)";
    // drawingContext.globalCompositeOperation = "xor";
    // drawingContext.globalCompositeOperation = "multiply";
    // drawingContext.globalCompositeOperation = "overlay";

    beginShape();
    push();

    this.particles.map((particle, i) => {
      const force = this.attractor.attract(particle);

      particle.applyForce(force);

      particle.update();
      // particle.display();
      particle.checkEdge();

      curveVertex(particle.pos.x, particle.pos.y);
    });

    pop();

    if (this.particles.length <= 0) this.createParticles();
    endShape();

    this.yOffset += 0.0001;
  }
}
