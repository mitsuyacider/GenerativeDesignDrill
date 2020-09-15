export default class Particle003 {
  constructor(pos, mass = 1) {
    this.topSpeed = random(3, 8);
    this.velocity = createVector(0, 0);
    this.acceleratation = p5.Vector.random2D();
    this.acceleratation.mult(random(0));

    this.pos = pos;
    this.fill;
    this.stroke;
    this.size = 0;
    this.maxSize = random(5, 10);
    this.gradient;
    this.friction;
    this.mass = mass;
  }

  update() {
    // this.acceleratation = p5.Vector.random2D();
    // this.acceleratation.mult(random());
    if (this.size < this.maxSize) {
      this.size += 0.1;
    } else {
      this.velocity.add(this.acceleratation);
      this.velocity.limit(this.topSpeed);
      this.pos.add(this.velocity);
    }

    this.acceleratation.mult(0);
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

  applyForce(force) {
    this.acceleratation.add(force);
  }

  display() {
    push();
    noStroke();
    // stroke(this.fill);
    // strokeWeight(1);
    // noFill();
    // drawingContext.shadowColor = color(255, 0, 0);
    // drawingContext.shadowBlur = 5;

    if (this.fill) {
      fill(color(this.fill));
    } else {
      fill(255, 0, 0);
    }

    const vec = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  gone() {
    return this.pos.y < 0;
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
      // this.pos.y = 0;
    }
  }
}
