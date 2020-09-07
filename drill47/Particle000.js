export default class Particle000 {
  constructor() {
    this.topSpeed = random(3, 8);
    this.velocity = createVector(0, 0);
    this.acceleratation = p5.Vector.random2D();
    this.acceleratation.mult(random(2));
    this.pos = createVector(width / 2, height / 2);
    this.fill;
    this.stroke;
    this.size = random(5, 30);
  }

  update() {
    this.acceleratation = p5.Vector.random2D();
    this.acceleratation.mult(random(2));
    this.velocity.add(this.acceleratation);
    this.velocity.limit(this.topSpeed);
    this.pos.add(this.velocity);
  }

  display() {
    push();
    noStroke();
    // drawingContext.shadowBlur = 5;
    if (this.fill) {
      fill(color(this.fill));
    } else {
      fill(255, 0, 0);
    }

    ellipse(this.pos.x, this.pos.y, this.size);

    pop();
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
