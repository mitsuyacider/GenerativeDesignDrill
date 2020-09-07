import Grid from "./Grid.js";
export default class LineGrid extends Grid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
		super(x, y, w, h);
  }

  draw(fc, sc, sw) {
    const width = this.w;
    const height = this.h;

    push();

    if (fc) fill(fc);
    if (fc === "none") noFill();
    if (sc) stroke(sc);
    if (sc === "none") noStroke();
		if (sw) strokeWeight(sw)
		
		
    translate(this.x, this.y);

		const ran = Math.floor(random(0, 2))
		if (ran === 0) line(0, 0, width, height)
		else if (ran === 1) line(width, 0, 0, height)
		else line(width, 0, 0, height)
    pop();
  }
}
