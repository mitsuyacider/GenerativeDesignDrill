class Triangle2 {
 	
  constructor(v1, v2, v3) {   
    // this.p1 = createVector();
    // this.p2 = createVector();
    // this.p3 = createVector();
		this.p1 = v1;
    this.p2 = v2;
    this.p3 = v3;
    this.points = [this.p1, this.p2, this.p3];
		this.duplicated = false;
  }
  
  // 同値判定
  // param t : Triangle2 Object
  equals(t) {
    for (var i = 0; i < t.points.length; i++) {
      if (!this.hasPoint(t.points[i])) return false;
    }
    
    return true;
  }
                           
  hasPoint(p) {
    for (var i = 0; i < this.points.length; i++) {     	
      if (p.equals(this.points[i])) return true;
    }
    
    return false;
	}
	
	hasSamePoints(t) {
		for (var i = 0; i < t.points.length; i++) {
			var p = t.points[i];

			for (var j = 0; j < this.points.length; j++) {     	
				var p2 = this.points[j];
				if (p.equals(p2)) return true;
			}
    }				
		return false;
	}
	
	draw() {
		triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
	}
	
	dump() {
		print("p1.x =  " + this.p1.x + " / p1.y = " + this.p1.y  + " / p2.x = " + this.p2.x + " / p2.y = " + this.p2.y + " / p3.x = " + this.p3.x + " / p3.y = " + this.p3.y);
	}
}