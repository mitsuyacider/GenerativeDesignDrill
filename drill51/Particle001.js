export default class Particle001 {
  constructor() {
    this.topSpeed = random(3, 8);
    this.velocity = createVector(0, 0);
    this.acceleratation = p5.Vector.random2D();
    this.acceleratation.mult(random(0));

    this.pos = createVector(random(width), random(height / 2) + height / 2);
    this.fill;
    this.stroke;
    this.size = random(50, 100);
    this.gradient;
  }

  update() {
    // this.acceleratation = p5.Vector.random2D();
    // this.acceleratation.mult(random());
    this.velocity.add(this.acceleratation);
    this.velocity.limit(this.topSpeed);
    this.pos.add(this.velocity);

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
    // drawingContext.shadowBlur = 5;
    if (this.fill) {
      fill(color(this.fill));
    } else {
      fill(255, 0, 0);
    }

    const vec = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
    const len = vec.mag();

    const xx = Math.floor(cos(90) * this.pos.x);
    const gradient = drawingContext.createLinearGradient(
      xx,
      this.pos.y,
      this.pos.x + this.size,
      this.pos.y + this.size
    );
    drawingContext.fillStyle = gradient;
    // Add three color stops
    const c = this.hexToRgb(this.fill);
    if (c) {
      // const g = this.hexToRgb(this.gradient);
      gradient.addColorStop(0, `rgb(${c.r}, ${c.g}, ${c.b})`);
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 100)");
      gradient.addColorStop(1, `rgb(${c.r}, ${c.g}, ${c.b})`);
    }

    // Set the fill style and draw a rectangle
    // translate(width / 2, height / 2);
    // translate(width / 2, height / 2);
    const rad = atan2(this.pos.y - height / 2, this.pos.x - width / 2);
    // rotate(rad);
    // stroke("green");
    strokeJoin(ROUND);
    // rect(0, 0, len, 5);
    // line(width / 2, height / 2, this.pos.x, this.pos.y);
    drawingContext.shadowColor = color(255, 0, 0);
    drawingContext.shadowBlur = 25;

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
