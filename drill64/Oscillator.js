export default class Oscillator {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    this.amplitude = 100;
    this.angleVel = 0.02;
    this.angle = 0;
    this.startAngle = 0;
  }

  display() {
    push();
    strokeWeight(1);
    this.angle = this.startAngle;
    let from = color(359, 100, 100, 15);
    let to = color(0, 100, 100, 15);

    for (let x = 0; x < width; x += 4) {
      const y = this.amplitude * sin(this.angle);
      const alpha = map(x, 0, width, 0, 1);
      let c = lerpColor(from, to, alpha);
      let size = map(x, 0, width, 2, 200);
      fill(c);
      ellipse(x, y + height / 2, size, size);
      this.angle += this.angleVel;
    }
    pop();

    this.startAngle += 0.02;
  }
}
