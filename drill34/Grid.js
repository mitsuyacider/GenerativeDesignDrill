export default class Grid {
  constructor(x = 0, y = 0, w = 100, h = 100) {
		this.x = x
		this.y = y
		this.w = w;
    this.h = h;
  }

	update(x, y) {}

  draw(fc, sc) {
		const width = this.w
		const height = this.h

		push()

    if (fc) fill(fc)
		if(fc === 'none') noFill()
		if (sc) stroke(sc)
		if(sc === 'none') noStroke()

		translate(this.x, this.y)



		ellipse(0, 0, width / 2, height / 2);
		rect(0, 0, width, height)
		pop()
  }
}
