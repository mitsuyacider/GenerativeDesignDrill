// NOTE: http://tercel-sakuragaoka.blogspot.jp/2011/06/processingdelaunay_3958.html

var pointList;
var delaunay;
var speed;
var img;
// var scribble = new Scribble();


function preload() {
	img = loadImage("out.jpg");
	// img = loadImage("lenna.png");
}

function setup() { 
  createCanvas(windowWidth, windowHeight);

	delaunay = new Delaunay();
	pointList = [];
	speed = 0;
	
	// ポイントリストを作成する
	for (var i = 0; i < 1000; i++) {
			var x = random(500);
			var y = random(300);
			var p = createVector(x, y);
			pointList.push(p);
				var c = img.get(x, y);
				fill(c);

			ellipse(x, y, 10, 10);
	}	
	
	delaunay.create(pointList);
	
	// image(img, width / 2, height / 2);
	image(img, 0, 0);
	img.loadPixels();

	noLoop();
}

function draw() {
	background(0);
	randomSeed(0);
	
	push();
	translate(width / 2 - img.width / 2, height / 2 - img.height / 2);	
	// pointを更新
	for (var i = 0; i < pointList.length; i++) {
			var p = pointList[i];
			p.x = p.x + cos(radians(random(360) + speed));
			p.y = p.y + sin(radians(random(360) + speed));

			// ellipse(p.x, p.y, 10, 10);
	}		
	
	speed++;
	
	delaunay.create(pointList);
	delaunay.draw(img.pixels, img.width);
	pop();
	
	fill(255);
	text(frameRate(), 50, 50);
	
	// imageMode(CENTER);
	tint(255, 107);
	// image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
	// image(img, 0, 0);
}