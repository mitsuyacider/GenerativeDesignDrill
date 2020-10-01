import Particle006 from "./Particle006.js";
export default class ParticleSystem {
  constructor(p) {
    this.origin = p.copy();
    this.particles = [];

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.pos = p.copy();
    this.lifespan = 255.0;
    this.mass = 1;
    this.size = 5;

    this.isDisplay = true;
  }

  addParticle() {
    const r = random(1);
    if (r < 0.5) {
      this.particles.push(new Particle006(this.origin));
    } else {
      this.particles.push(new Particle006(this.origin));
    }
  }

  applyForce(f) {
    for (let p of this.particles) {
      p.applyForce(f);
    }
  }

  run() {
    for (let index in this.particles) {
      const p = this.particles[index];
      p.run();

      if (p.isDead()) {
        this.particles.splice(index, 1);
      }
    }

    this.update();
    this.checkEdge();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.origin.add(this.velocity);
    this.acceleration.mult(0);

    if (this.isDisplay) this.display();
  }

  display() {
    push();
    fill(0, 0, 0);
    ellipse(this.origin.x, this.origin.y, 10, 10);
    pop();
  }

  checkEdge() {
    if (this.origin.x > width) {
      this.velocity.x *= -1;
      // this.pos.x = width;
    }

    if (this.origin.x < 0) {
      this.velocity.x *= -1;
      // this.pos.x = 0;
    }

    if (this.origin.y > height) {
      this.velocity.y *= -1;
      // this.pos.y = height;
    }

    if (this.origin.y < 0) {
      this.velocity.y *= -1;
      // this.pos.y = 1;
    }
  }
}
