// NOTE: http://tercel-sakuragaoka.blogspot.jp/2011/06/processingdelaunay_3958.html

var pointList;
var delaunay;
var speed;
var img;
let pg;

function preload() {
	img = loadImage("out.jpg");
	// img = loadImage("lenna.png");
}

function setup() { 
	createCanvas(windowWidth, windowHeight);
	pg = createGraphics(img.width, img.height);
	pg.background(255);
	ellipseMode(CENTER)
	noFill()
	noLoop();
}

function draw() {
	background(0);


	for (let i = 0; i < 100; i++) {

		pg.stroke(0)
		pg.noFill();
	
		pg.push()

		// randomSheed(2)
		const ran = Math.floor(random(1, 4))

		pg.strokeWeight(ran)
		// pg.translate(img.width / 2, img.height / 2)
		pg.ellipse(0, 0, i * 10, i * 10)
		pg.pop()
	}


  //Draw the offscreen buffer to the screen with image()
	// image(pg, 0, 0);
	img.mask(pg);
	image(img, 0, 0);

}
