import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid002 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);
  }

  render(x, y, width, height) {
    const ran1 = random(0, 100);
    const ran2 = random(0, 100);
    const ran3 = random(0, 5);
    const ran4 = random(0, 100);
    const ran5 = random(0, 100);
    const ran6 = random(0, 100);

    let gradient = drawingContext.createLinearGradient(
      ran1,
      ran2,
      ran3,
      ran4,
      ran5,
      ran6
    );

    const ran7 = random(0, 0.5);
    const ran8 = random(0, 0.5);
    gradient.addColorStop(0, color(ColorPallet.getRandom()));
    gradient.addColorStop(ran7, color(ColorPallet.getRandom()));
    gradient.addColorStop(ran8, color(ColorPallet.getRandom()));
    drawingContext.fillStyle = gradient;

    ellipse(x, y, (width / 5) * 4);
  }
}
