import BaseGrid from "./BaseGrid.js";
import ColorPallet from "./ColorPallet.js";
export default class Grid007 extends BaseGrid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
    super(x, y, w, h);

    this.xOffset = random(0.01, 0.05);
    this.yOffset = random(0.01, 0.05);
    this.zOffset = random(0.01, 0.05);
    this.phase = 0;
    this.phaseSpeed = random(0.001, 0.008);

    this.noiseMax = random(5, 500);
  }

  render(x, y, w, h) {
    push();
    noFill();
    strokeWeight(1);
    stroke(ColorPallet.getRandom());
    translate(w / 2, w / 2);
    beginShape();
    for (let i = 0; i < 360; i += 15) {
      this.xOffset = map(cos(i), -1, 1, 0, this.noiseMax);
      this.yOffset = map(sin(i), -1, 1, 0, this.noiseMax);
      let r = map(
        noise(this.xOffset, this.yOffset, this.zOffset),
        0,
        1,
        100,
        200
      );
      const x = r * cos(i);
      const y = r * sin(i);
      curveVertex(x, y);

      this.xOffset += 0.02;
      this.yOffset += 0.02;
    }
    endShape(CLOSE);
    pop();

    this.phase += this.phaseSpeed;
    this.zOffset += this.phaseSpeed;
  }
}
