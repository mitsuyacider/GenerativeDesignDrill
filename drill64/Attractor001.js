export default class Attractor001 {

  constructor(l_, m_, g_) {
    this.pos = l_.copy();
    this.mass = m_;
    this.G = g_;
    this.drag = createVector(0.0,0.0);
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
  }

  go() {
    this.render();
    this.setDrag();
  }

  attract(c) {
    const dir = p5.Vector.sub(this.pos,c.pos);        // Calculate direction of force
    let d = dir.mag();                              // Distance between objects
    d = constrain(d,5.0,25.0);                        // Limiting the distance to eliminate "extreme" results for very close or very far objects
    dir.normalize();                                  // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    const force = (this.G * this.mass * c.mass) / (d * d); // Calculate gravitional force magnitude
    dir.mult(force);                                  // Get force vector --> magnitude * direction
    return dir;
  }

  // Method to display
  render() {
    ellipseMode(CENTER);
    stroke(0,100);
    if (this.dragging) fill (50);
    else if (this.rollover) fill(100);
    else fill(175,50);
    ellipse(this.pos.x,this.pos.y,this.mass*2,this.mass*2);
  }

  // The methods below are for mouse interaction
  mousePressed(mx, my) {
    
    const d = dist(mx,my,this.pos.x,this.pos.y);
    if (d < this.mass) {
      this.dragging = true;
      this.drag.x = this.pos.x-mx;
      this.drag.y = this.pos.y-my;
    }
  }

  setRollover( mx,  my) {
    const d = dist(mx,my,this.pos.x,this.pos.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  stopDragging() {
    this.dragging = false;
  }
  
 

  setDrag() {
    if (this.dragging) {
      this.pos.x = mouseX + this.drag.x;
      this.pos.y = mouseY + this.drag.y;
    }
  }

}