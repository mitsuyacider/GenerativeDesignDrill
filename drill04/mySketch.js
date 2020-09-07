let p1, p2, p3;
let speed = 1;
let division = 2;
const maxDivision = 40

function setup() {
	createCanvas(windowWidth, windowHeight);

	p1 = createVector(100, 100);
	p2 = createVector(500, 150);
	p3 = createVector(200, 400);

	frameRate(10)
	stroke(255)
	noFill()

	// noLoop()
}

function draw() {
	background(0);

	
	// centerX, centerY
	const centerX = width / 2;
	const centerY = height / 2;

	const distance = dist(centerX, centerY, mouseX, mouseY);
	
	
	// const division = map(distance, 0, width, 2, 15);
	// const division = 15;
				
	triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

	for (let i = 0; i < division; i ++) {
		// NOTE: Pm（x+(X-x)×m/n，ｙ+(Y-y)×m / ｎ） 
		// 			 A（x，y）、B（X，Y）
		// @param n division
		// @param m number of division
		// @return position
		const x = p1.x + (p2.x - p1.x) * i / division
		const y = p1.y + (p2.y - p1.y) * i / division

		const x1 = p1.x + (p3.x - p1.x) * i / division
		const y1 = p1.y + (p3.y - p1.y) * i / division

		const x2 = p2.x + (p3.x - p2.x) * i / division
		const y2 = p2.y + (p3.y - p2.y) * i / division


		const x3 = p3.x + (p2.x - p3.x) * i / division
		const y3 = p3.y + (p2.y - p3.y) * i / division


		const alpha = map(i, 2, maxDivision, 20, 255);
		// ellipse(x, y, 10, 10);
		// ellipse(x1, y1, 10, 10)


		// stroke(255, 255, 255, alpha)
		line(x, y, x1, y1)
		line(x1, y1, x2, y2)
		line(x, y, x3, y3)
	}

	division += speed;

	if (division > maxDivision || division <= 2) {
		speed *= -1;
	}
	
	// ellipse(width / 2, height / 2, 10, 10)
}


