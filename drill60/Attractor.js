export default class Attractor {
  constructor(pos) {
    this.mass = 10;
    this.pos = pos ? pos : createVector(width / 2, height / 2);

    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.topSpeed = 1;
    this.acceleratation = createVector(0, 0);
    this.acceleratation.mult(0);
  }

  update() {
    // this.acceleratation = p5.Vector.random2D();
    // this.acceleratation.mult(random());
    this.velocity.add(this.acceleratation);
    this.velocity.limit(this.topSpeed);
    this.pos.add(this.velocity);

    this.acceleratation.mult(0);
  }

  display() {
    push();
    noStroke();
    fill(175, 200);
    ellipse(this.pos.x, this.pos.y, this.mass * 2, this.mass * 2);
    pop();
  }

  applyForce(force) {
    this.acceleratation.add(force);
  }

  attract(v) {
    const force = p5.Vector.sub(this.pos, v.pos);
    let distance = force.mag();
    distance = constrain(distance, 50, 100);
    force.normalize();

    const g = 0.4;
    const strength = (g * this.mass * v.mass) / (distance * distance);
    force.mult(strength);

    return force;
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
