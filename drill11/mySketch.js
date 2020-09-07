// NOTE: http://tercel-sakuragaoka.blogspot.jp/2011/06/processingdelaunay_3958.html

var pointList;
var delaunay;
var speed;
var img;
// var scribble = new Scribble();


function preload() {
	img = loadImage("monariza.png");
	// img = loadImage("lenna.png");
  mask = loadImage("mask.png");
  monariza = loadImage("monariza2.png");
}

function setup() { 
  createCanvas(windowWidth, windowHeight);

	delaunay = new Delaunay();
	pointList = [];
	speed = 0;
	
	// ポイントリストを作成する
	// for (var i = 0; i < 100; i++) {
  //   var x = random(400);
  //   var y = random(400);
  //   var p = createVector(x, y);
  //   pointList.push(p);
  //     var c = img.get(x, y);
  //     fill(c);

  //   ellipse(x, y, 10, 10);
  // }
  
	mask.loadPixels();

  for (var x = 0; x < mask.width; x+=4) {
    for (var y = 0; y < mask.height; y+=4) {
      // var x = parseInt(value2.p1.x);
      // var y = parseInt(value2.p1.y);
      var base = (y * mask.width + x) * 4;
      // (y * width + x) * d * 4;
      var r = mask.pixels[base];

      var ran = random(10)
      if (r === 0 && ran < 5) {
        var p = createVector(x, y);
        pointList.push(p);
      }
    }
  }

	
	delaunay.create(pointList);
	
	// image(img, width / 2, height / 2);
	image(img, 0, 0);
	img.loadPixels();

	// noLoop();
}

function draw() {
	background(0);
	randomSeed(0);
  
	tint(255, 107);
	// image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
	image(monariza,width / 2 - img.width / 2, height / 2 - img.height / 2);

	push();
	translate(width / 2 - img.width / 2, height / 2 - img.height / 2);	
	// pointを更新
	for (var i = 0; i < pointList.length; i++) {
			var p = pointList[i];
			p.x = p.x + cos(radians(random(360) + speed));
			p.y = p.y + sin(radians(random(360) + speed));

			// ellipse(p.x, p.y, 10, 10);
	}		
	
	speed += 10;
	
	delaunay.create(pointList);
	delaunay.draw(img.pixels, img.width);
	pop();
	
	fill(255);
	// text(frameRate(), 50, 50);
	
	// imageMode(CENTER);
}