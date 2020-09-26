export default class Liquid {
  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   * @param {Number} c Coefficiency
   */
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  display() {
    push();
    noStroke();
    fill(175, 105);
    drawingContext.shadowColor = color(255, 0, 0);
    drawingContext.shadowBlur = 25;
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
