class CircumCircle  {
	constructor(v1, v2, v3) {
		this.center = this.culcPosition(v1, v2, v3);
		this.radius = this.culcSize(v1, this.center);
	}
	
	draw() {
		ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2);
	}
		
	culcPosition(v1, v2, v3) {
		var x1 = v1.x;
		var y1 = v1.y;
		var x2 = v2.x;
		var y2 = v2.y;
		var x3 = v3.x;
		var y3 = v3.y;

		var c = 2 * ( (x2 - x1)*(y3 - y1) - (y2 - y1)*(x3 - x1) )  
		var p = ( (y3 - y1)*(pow(x2,2) - pow(x1,2) + pow(y2,2) - pow(y1,2)) + (y1 - y2)*(pow(x3, 2) - pow(x1, 2) + pow(y3, 2) - pow(y1,2)) ) / c;
		var q = ( (x1 - x3)*(pow(x2,2) - pow(x1,2) + pow(y2,2) - pow(y1,2)) + (x2 - x1)*(pow(x3,2) - pow(x1,2) + pow(y3,2) - pow(y1,2)) ) / c;
		var position = createVector(p, q);
		return position;
	}		
		
	culcSize(v1, p1) {
		var _x = (v1.x - p1.x);
		var _y = (v1.y - p1.y);
		var r = sqrt((_x * _x) + (_y * _y));

		return r;
	}
	
	inCircle(v1) {
		return this.center.dist(v1) <= this.radius;
	}
}