import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid003 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);
  }

  render(x, y, width, height) {
    const ran1 = random(0, width / 2);
    const ran2 = random(0, height / 2);
    const ran3 = random(0, 5);
    const ran4 = random(0, 100);
    const ran5 = random(0, 100);
    const ran6 = random(0, 100);

    // const radius = (width / 5) * 4;
    const radius = width * 2;

    let gradient = drawingContext.createRadialGradient(
      x, // x1
      y, // y1
      radius / 4, // r1
      x, // x2
      y, // y2
      radius // r2
    );
    // let gradient = drawingContext.createRadialGradient(x, y, 5, x, y, 50);

    const ran7 = random(0, 0.5);
    const ran8 = random(0, 0.5);

    gradient.addColorStop(0, color(255));
    gradient.addColorStop(1, color(0));
    // gradient.addColorStop(ran7, color(ColorPallet.getRandom()));

    drawingContext.fillStyle = gradient;
    drawingContext.shadowColor = color(200, 0, 0, 100);
    drawingContext.shadowBlur = 40;

    noStroke();
    ellipse(x, y, radius);
  }
}

const x = 10;
const y = 20;
const size = 50;

// いろいろな書き方があります
// カンマ区切り
console.log("x position =", x, "y position =", y);

// カンマ区切り +記号で連結
console.log("y position =" + y);

// バッククウォートで囲うと、変数も文字列に盛り込めます。
// このテクニックは通常の文字列を扱う場合も同様です。
console.log(`size variable equals ${size}`);
