import BaseGrid from "./BaseGrid.js";
import Oscillator001 from "./Oscillator001.js";

export default class Grid000 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);
    const dataset = {
      x,
      y: y / 2,
      w,
      h: h / 2,
      step: 2,
      angleVel: random(-0.5, 0.5),
      amplitude: random(5, 50),
      angleAcc: random(-0.3, 0.3),
    };
    this.oscillator = new Oscillator001(dataset);
  }

  draw(fc, sc, sw) {
    const width = this.w;
    const height = this.h;

    push();

    if (fc) fill(fc);
    if (fc === "none") noFill();
    if (sc) stroke(sc);
    if (sc === "none") noStroke();
    if (sw) strokeWeight(sw);

    translate(this.x, this.y);
    const ran = Math.floor(random(0, 2));
    if (ran === 0) line(0, 0, width, height);
    else if (ran === 1) line(width, 0, 0, height);
    else line(width, 0, 0, height);

    this.oscillator.display();
    pop();
  }
}
