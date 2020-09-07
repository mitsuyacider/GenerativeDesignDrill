let verticals = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  let y = 50;
  for (let i = 0; i < 600; i += 80) {
    let vertical = new Vertical(i, y);
    verticals.push(vertical);
  }

  y = 100;
  for (let i = 0; i < 600; i += 80) {
    let vertical = new Vertical(i + 40, y);
    verticals.push(vertical);
  }
}

function draw() {
  background(255);

  verticals.map((v) => v.update());
}

class Vertical {
  constructor(x = 0, y = 0) {
    this.speed = 5;
    this.currentX = x;
    this.currentY = y;
  }

  update() {
    fill(255, 0, 0, 100);
    for (let i = 0; i < 600; i += 20) {
      const y = this.currentY + i;
      ellipse(this.currentX, y, 10);
    }

    if (this.currentX > width || this.currentX < 0) {
      this.speed *= -1;
    }

    this.currentX += this.speed;
  }
}
