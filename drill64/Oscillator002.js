export default class Oscillator002 {
  constructor(config) {
    this.angle = 0;
    this.startAngle = random(0, 360);

    const defaultConfig = {
      x: 0,
      y: height / 4,
      w: width,
      h: 200,
      step: 4,
      amplitude: 100,
      angleVel: 0.02,
      angleAcc: 0.02,
    };

    const mergedConfig = { ...defaultConfig, ...config };

    this.x = mergedConfig.x;
    this.y = mergedConfig.y;
    this.w = mergedConfig.w;
    this.h = mergedConfig.h;
    this.step = mergedConfig.step;
    this.amplitude = mergedConfig.amplitude;
    this.angleVel = mergedConfig.angleVel;
    this.angleAcc = mergedConfig.angleAcc;

    this.pos = createVector(this.x,this.y)
    this.velocity = createVector(random(-5), random(5));
    this.acceleratation = createVector(random(-0.1), random(0.1));
    // this.acceleratation.mult(0);
    this.topSpeed = 1
  }

  applyForce(force) {
    this.acceleratation.add(force);
  }

  update() {
    this.velocity.add(this.acceleratation);
    this.velocity.limit(this.topSpeed);
    this.pos.add(this.velocity);

    this.acceleratation.mult(0);

  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    // rotate(this.velocity.heading())
    strokeWeight(1);
    this.angle = this.startAngle;
    let from = color(359, 100, 100, 15);
    let to = color(0, 100, 100, 15);

    for (let x = 0; x < this.w; x += this.step) {
      const y = this.amplitude * sin(this.angle);      
      const alpha = map(x, 0, this.w, 0, 1);
      let c = lerpColor(from, to, alpha);
      let size = map(x, 0, this.w, 2, this.h);
      fill(c);
      push()
      translate(x, y)
      const deg = map(x, 0, this.w, 0, 360)
      rotate((deg + this.angle * 80) / 100)
      // rotate(this.velocity.heading())
      rect(0, 0, size, size);
      pop()
      this.angle += this.angleVel;
    }
    pop();

    this.startAngle += this.angleAcc;

    // rect(this.pos.x, this.pos.y, 20, 20)
    
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
