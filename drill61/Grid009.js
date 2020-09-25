import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid009 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);

    this.xOffset = random(0.01, 0.05);
    this.yOffset = random(0.01, 0.05);
    this.zOffset = random(0.01, 0.05);
    this.phase = 0;
    this.phaseSpeed = random(0.001, 0.008);

    this.noiseMax = random(5, 500);
    this.angle = random(0, 360);
    this.angleSpeed = random(-1, 1);
  }

  update() {
    this.angle += this.angleSpeed;
  }

  render(x, y, w, h) {
    push();
    rotate(this.angle);
    // noFill();

    // drawingContext.filter = "blur(2px)";
    fill(ColorPallet.getRandom());
    // strokeWeight(random(5, 20));

    const c = ColorPallet.getRandom();
    stroke(c);
    strokeWeight(1);
    translate(posX, posY);

    var posX = x;
    var posY = y;
    var tileWidth = w;
    var tileHeight = h;
    const drawMode = 3;
    const count = 10;
    var para = 10;

    // switch between modules
    switch (drawMode) {
      case 1:
        translate(-tileWidth / 2, -tileHeight / 2);
        for (var i = 0; i < count; i++) {
          line(
            0,
            (para + 0.5) * tileHeight,
            tileWidth,
            (i * tileHeight) / count
          );
          line(
            0,
            (i * tileHeight) / count,
            tileWidth,
            tileHeight - (para + 0.5) * tileHeight
          );
        }
        break;
      case 2:
        for (var i = 0; i <= count; i++) {
          line(
            para * tileWidth,
            para * tileHeight,
            tileWidth / 2,
            (i / count - 0.5) * tileHeight
          );
          line(
            para * tileWidth,
            para * tileHeight,
            -tileWidth / 2,
            (i / count - 0.5) * tileHeight
          );
          line(
            para * tileWidth,
            para * tileHeight,
            (i / count - 0.5) * tileWidth,
            tileHeight / 2
          );
          line(
            para * tileWidth,
            para * tileHeight,
            (i / count - 0.5) * tileWidth,
            -tileHeight / 2
          );
        }
        break;
      case 3:
        for (var i = 0; i <= count; i++) {
          drawingContext.globalCompositeOperation = "hue";

          line(
            0,
            para * tileHeight,
            tileWidth / 2,
            (i / count - 0.5) * tileHeight
          );
          line(
            0,
            para * tileHeight,
            -tileWidth / 2,
            (i / count - 0.5) * tileHeight
          );
          line(
            0,
            para * tileHeight,
            (i / count - 0.5) * tileWidth,
            tileHeight / 2
          );
          line(
            0,
            para * tileHeight,
            (i / count - 0.5) * tileWidth,
            -tileHeight / 2
          );

          // drawingContext.globalCompositeOperation = "source-over";
        }
        break;
    }
    pop();

    // drawingContext.shadowColor = color(c);
    // drawingContext.shadowBlur = random(20, 50);
    // translate(w / 2, w / 2);

    // beginShape();
    // for (let i = 0; i < 360; i += 15) {
    //   this.xOffset = map(cos(i), -1, 1, 0, this.noiseMax);
    //   this.yOffset = map(sin(i), -1, 1, 0, this.noiseMax);
    //   let r = map(
    //     noise(this.xOffset, this.yOffset, this.zOffset),
    //     0,
    //     1,
    //     100,
    //     200
    //   );
    //   const x = r * cos(i);
    //   const y = r * sin(i);
    //   curveVertex(x, y);

    //   // ellipse(x, y, 10, 10);
    //   this.xOffset += 0.02;
    //   this.yOffset += 0.02;
    // }
    // endShape(CLOSE);
    // pop();

    // // eyse

    // fill(255);

    // const gap = 40;
    // const size = 10;

    // const mouse = createVector(mouseX - this.x, mouseY - this.y);
    // const mouse2 = createVector(mouseX - this.x, mouseY - this.y);
    // const right = createVector(x + w / 2 + gap, y + h / 2);
    // const left = createVector(x + w / 2 - gap, y + h / 2);
    // mouse.sub(right);
    // mouse.limit(size);

    // mouse2.sub(left);
    // mouse2.limit(5);

    // ellipse(right.x, right.y, 40);
    // ellipse(x + w / 2 - gap, y + h / 2, 20);

    // fill(0);
    // push();
    // translate(right.x, right.y);
    // ellipse(mouse.x, mouse.y, 10);
    // pop();

    // push();
    // translate(left.x, left.y);
    // ellipse(mouse2.x, mouse2.y, 10);
    // pop();

    this.phase += this.phaseSpeed;
    this.zOffset += this.phaseSpeed;
  }
}
