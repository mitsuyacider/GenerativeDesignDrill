export default class Attractor {
  constructor() {
    this.mass = 20;
    this.pos = createVector(width / 2, height / 2);
  }

  display() {
    push();
    stroke(0);
    fill(175, 200);
    // ellipse(this.pos.x, this.pos.y, this.mass * 2, this.mass * 2);
    pop();
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
}
