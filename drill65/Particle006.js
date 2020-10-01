export default class Particle006 {
  constructor(p) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.pos = p.copy();
    this.lifespan = 255.0;
    this.mass = 1;
    this.size = 5;
  }

  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  run() {
    this.update();
    this.display();
  }

  applyForce(force) {
    const f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  display() {
    const angle = this.velocity.heading();
    push();
    rectMode(CENTER);
    noStroke();
    // // Add three color stops
    // const c = this.hexToRgb(this.fill);
    // if (c) {
    //   fill(c.r, c.g, c.b, this.lifespan);
    // }

    fill(255, 100, 100, this.lifespan);

    translate(this.pos.x, this.pos.y);
    rotate(angle + radians(90));
    rect(0, 0, this.size / 2, this.size * 3);
    pop();
  }

  isDead() {
    return this.lifespan < 0.0 || this.pos.y > height;
  }

  isInside(liquid) {
    const isIn =
      liquid.x < this.pos.x &&
      liquid.x + liquid.w > this.pos.x &&
      liquid.y < this.pos.y &&
      liquid.y + liquid.h > this.pos.y;

    return isIn;
  }

  // NOTE: Fd=−12ρv2ACdv∧
  // https://natureofcode.com/book/chapter-2-forces/
  drag(liquid) {
    const c = liquid.c;
    const dragVec = this.velocity.copy();
    const speed = dragVec.mag();
    const dragMag = c * speed * speed;
    dragVec.mult(-1);
    dragVec.normalize();
    dragVec.mult(dragMag);
    // console.log(dragMag);
    // dragVec.limit(0.05);
    this.applyForce(dragVec);
  }

  checkEdge() {
    if (this.pos.x > width) {
      this.velocity.x *= -1;
      // this.pos.x = width;
    }

    if (this.pos.x < 0) {
      this.velocity.x *= -1;
      // this.pos.x = 0;
    }

    if (this.pos.y > height) {
      this.velocity.y *= -1;
      // this.pos.y = height;
    }

    if (this.pos.y < 0) {
      this.velocity.y *= -1;
      // this.pos.y = 1;
    }
  }
}
