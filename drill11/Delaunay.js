class Delaunay  {
	constructor() {
		this.trianglesSet = [];
		this.scribble = new Scribble();
	}
	
	create(pointList) {
		this.trianglesSet = [];
		
		// 分割されている三角形のリスト
		// 一番最初の三角形は暫定的にキャンバス内に作る
		var hugeT = this.getHugeTriangle(createVector(0,0), createVector(width, height));
		this.trianglesSet.push(hugeT);

		for (var p = 0; p < pointList.length; p++) {

			// 追加予定の三角形リスト（暫定)
			var tmpTrianglesSet = [];
			// 追加する点を取得
			var newP = pointList[p];

			for(var ts = this.trianglesSet.length -1; ts >= 0 ; ts--){

					var value = this.trianglesSet[ts];
					// 三角形リストからひとつ取り出す(valueが三角形に当たる）
					var circumC = new CircumCircle(value.p1, value.p2, value.p3);
					// noFill();
					// stroke(0, 255, 0);
				// circumC.draw();
				if (circumC.inCircle(newP)) {
						// 追加する点が三角形の外接円に含まれる場合、
						// 取り出した三角形に対してnewPを中心に再分割を行う
						// 1. newP, value.p1, value.p2
						let nT1 = new Triangle2(newP, value.p1, value.p2);
						// 2. newP, value.p1, value.p3
						let nT2 = new Triangle2(newP, value.p1, value.p3);
						// 3. newP, value.p2, value.p3
						let nT3 = new Triangle2(newP, value.p2, value.p3);					

						for (var i = 0; i < tmpTrianglesSet.length; i++) {
							var tset = tmpTrianglesSet[i];
							if (nT1.equals(tset)) nT1.duplicated = true;
							if (nT2.equals(tset)) nT2.duplicated = true;	
							if (nT3.equals(tset)) nT3.duplicated = true;
						}

						tmpTrianglesSet.push(nT1);
						tmpTrianglesSet.push(nT2);
						tmpTrianglesSet.push(nT3);

						// このとき、元の三角形のリストから三角形を除外する必要がある
						this.trianglesSet.splice(ts, 1);

						// 	最終的に追加する三角形リストを、現在の三角形リストに加える
						this.trianglesSet.push(nT1);
						this.trianglesSet.push(nT2);
						this.trianglesSet.push(nT3);
					}
			}		

			this.trianglesSet = this.trianglesSet.filter(function(value, i, self) {
				for (let value2 of tmpTrianglesSet) {
					if (value.equals(value2) && value2.duplicated) {
							return false;
					 }
				}
				return true;
			});
		}

		// 外部の三角形の頂点を削除
		for(var ts = this.trianglesSet.length -1; ts >= 0 ; ts--){
			// 三角形リストから三角形を一つ取り出す
			var t = this.trianglesSet[ts];
			// 外部三角形の頂点を含む三角形があれば削除する
			if (t.hasSamePoints(hugeT)) {
				this.trianglesSet.splice(ts, 1);	
			}		
		}

		// noFill();
		// stroke(0, 255, 0);
		// for (let value2 of this.trianglesSet) {
		// 		fill(random(255), random(255), random(10), random(155));
		// 		value2.draw();
		// }		
	}
	
	draw(pixels, w) {
		noFill();
		// stroke(0, 0, 0);
		noStroke()
		for (var i = 0; i < this.trianglesSet.length; i++) {
			var value2 = this.trianglesSet[i];
			var x = parseInt(value2.p1.x);
			var y = parseInt(value2.p1.y);
			var base = (y * w + x) * 4;
			// (y * width + x) * d * 4;
  		var r = pixels[base];
      var g = pixels[base + 1];
      var b = pixels[base + 2];	
			var a = pixels[base + 3];
			stroke(r, g, b, a);
			// fill(r, g, b, a);

			// NOTE: triangle
			value2.draw();

			// this.scribble.scribbleLine(value2.p1.x, value2.p1.y, value2.p2.x, value2.p2.y)
			// this.scribble.scribbleLine(value2.p1.x, value2.p1.y, value2.p3.x, value2.p3.y)
			// this.scribble.scribbleLine(value2.p2.x, value2.p2.y, value2.p3.x, value2.p3.y)

			strokeWeight(1)
			// stroke(0);

			const dist1 = dist(value2.p1.x, value2.p1.y, value2.p2.x, value2.p2.y)
			const dist2 = dist(value2.p1.x, value2.p1.y, value2.p3.x, value2.p3.y)
			const maxDist = max(dist1, dist2)
			const division = Math.floor(map(maxDist, 0, 50, 5, 2));
			// randomSeed(0)
			const ran = Math.floor(random(0, 10))
			// console.log(ran)
			// const division = 5
			for (let i = 0; i < division; i ++) {
				// NOTE: Draw lines
				const x0 = value2.p1.x + (value2.p2.x - value2.p1.x) * i / division
				const y0 = value2.p1.y + (value2.p2.y - value2.p1.y) * i / division
		
				const x1 = value2.p1.x + (value2.p3.x - value2.p1.x) * i / division
				const y1 = value2.p1.y + (value2.p3.y - value2.p1.y) * i / division
		
				const x2 = value2.p2.x + (value2.p3.x - value2.p2.x) * i / division
				const y2 = value2.p2.y + (value2.p3.y - value2.p2.y) * i / division
		
		
				const x3 = value2.p3.x + (value2.p2.x - value2.p3.x) * i / division
				const y3 = value2.p3.y + (value2.p2.y - value2.p3.y) * i / division
		
				var xCoords = [ value2.p1.x, value2.p2.x, value2.p3.x ];
				// the y coordinates of the border points of the hachure
				var yCoords = [ value2.p1.y, value2.p2.y, value2.p3.y ];
				// the gap between two hachure lines
				var gap = 4.5;
				// the angle of the hachure in degrees
				// var angle = random(0, 315);
				var angle = 315;
				// this.scribble.scribbleFilling( xCoords, yCoords , gap, angle );

				// this.scribble.scribbleLine(x0, y0, x3, y3)
				
				// line(x0, y0, x1, y1)
				// line(x0, y0, x3, y3)	
				// line(x1, y1, x2, y2)

				if (ran == 0) {
					
					line(x0, y0, x3, y3)
				} else if (ran == 1) {
					line(x0, y0, x1, y1)
				} else if (ran == 2) {
					line(x1, y1, x2, y2)					


					// line(x0, y0, x1, y1)
					// line(x0, y0, x3, y3)	
					// line(x1, y1, x2, y2)
	
				} else {
					line(x0, y0, x1, y1)
					line(x0, y0, x3, y3)	
					line(x1, y1, x2, y2)					
				}
			}
		}			
	}
	
	// Param: 
	//			 v1: anchor point of left above
	//       v2: anchor point of right bottom
	getHugeTriangle(v1, v2) {
			// 矩形の外接円に外接する三角形をもとめる
			var frame = p5.Vector.sub(v1, v2);
			var w = Math.abs(frame.x);
			var h = Math.abs(frame.y);
			var x = v1.x;
			var y = v1.y;
			var p1 = createVector(x, y);
			var p2 = createVector(x, y + h);
			var p3 = createVector(x + w, y);
			
			// 与えられた四角形から３点選び、選ばれたその三角形の外接円を取得
			var c = new CircumCircle(p1, p2, p3);
		
			// 逆三角形 ▽の頂点を算出
			// 直角三角形の辺の比は1:2:√３
			var A = createVector(c.center.x - Math.sqrt(3) * c.radius, c.center.y - c.radius);
			var	B = createVector(c.center.x, c.center.y + c.radius * 2);
			var	C = createVector(c.center.x + Math.sqrt(3) * c.radius, c.center.y - c.radius);			
			
			// // for debug...
			// fill(255);
			// stroke(255);
			// rect(p1.x, p1.y, w, h);
			// noFill();
			// var c = new CircumCircle(p1, p2, p3);
			// c.draw();
			// triangle(A.x, A.y, B.x, B.y, C.x, C.y);		
		
			return new Triangle2(A, B, C);
		}
	}