import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid003 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);
  }

  render(x, y, w, h) {
    const ran1 = random(0, w / 2);
    const ran2 = random(0, h / 2);
    const ran3 = random(0, 5);
    const ran4 = random(0, 100);
    const ran5 = random(0, 100);
    const ran6 = random(0, 100);

    // const radius = (width / 5) * 4;
    const radius = w * 2;
    strokeWeight(1);

    noStroke();

    let tileWidth = w;
    let width = w;
    let height = h;
    // let circleCount = mouseX / 30 + 1;
    let circleCount = 6;
    let endSize = map(mouseX, 0, max(w, mouseX), tileWidth / 2, 0);
    let endOffset = map(
      mouseY,
      0,
      max(height, mouseY),
      0,
      (tileWidth - endSize) / 2
    );
    // ellipse(x, y, radius);
    // ellipse(x, y, radius / 4);

    // for (var i = 0; i < circleCount; i++) {
    //   var diameter = map(i, 0, circleCount, width, endSize);
    //   var offset = map(i, 0, circleCount, 0, endOffset);
    // const radian = atan2(mouseY - y - height / 2, mouseX - x - width / 2);
    //   let px = offset * cos(radian);
    //   let py = offset * sin(radian);
    // }

    const radian = atan2(
      mouseY - (window.height / 2 - y),
      mouseX - (window.width / 2 - x)
    );
    const size = w / 4;
    const px = size * cos(radian);
    const py = size * sin(radian);

    let gradient = drawingContext.createRadialGradient(
      px, // x1
      py, // y1
      radius / 8, // r1
      x, // x2
      y, // y2
      radius / 2 // r2
    );
    // let gradient = drawingContext.createRadialGradient(x, y, 5, x, y, 50);

    gradient.addColorStop(0, color(255));
    gradient.addColorStop(1, color(0));
    // gradient.addColorStop(ran7, color(ColorPallet.getRandom()));

    drawingContext.fillStyle = gradient;
    drawingContext.shadowColor = color(ColorPallet.getRandom());
    drawingContext.shadowBlur = 80;

    ellipse(x, y, w, w);
    ellipse(px, py, size, size);
  }
}
