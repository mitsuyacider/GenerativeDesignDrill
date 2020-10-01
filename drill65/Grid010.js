import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid010 extends BaseGrid {
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
    this.mode = Math.floor(random(1, 4));
    this.count = Math.floor(random(5, 10));
    this.para = random(0, 0.3);
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
    // const drawMode = Math.floor(random(0, 4));
    const drawMode = 1;
    const count = this.count;
    var para = this.para;

    // switch between modules
    switch (this.mode) {
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
  }
}
