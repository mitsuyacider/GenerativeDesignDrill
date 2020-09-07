class Point2 extends p5.Vector {
  constructor() {
    super();
  }
  
  // may not be used
  equals(o) {
    return this.equals(o);
  }
  
  draw() {
   	point(this.x, this.y); 
  }
}