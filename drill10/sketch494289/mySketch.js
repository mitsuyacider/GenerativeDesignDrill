let cache;
let pixelsImage;
let speed = 0;

// 初期化の関数
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  cache = createGraphics(width, height);
  const txtSize = 50;
  cache.textSize(txtSize);
  cache.textAlign(CENTER, CENTER);

  cache.fill(0, 0, 0, 255);
  cache.text("Shinonome \nCinnamon", 185, 185);
  cache.noStroke();

  for (let i = -height; i < height; i += 15) {
    cache.rect(0, i + (speed % height), width, 15);
  }

  cache.loadPixels();
}

function draw() {
  randomSeed(frameCount / 20);
  background(255);
  fill(0);

  // noStroke();
  push();
  translate(width / 2, height / 2);
  let diff = 15;
  if (key === "a") {
    rotate(radians(45));
    diff = 0;
  } else if (key === "s") {
    rotate(radians(90));
  } else if (key === "d") {
    rotate(radians(-45));
  }
  noStroke();
  for (let i = -height; i < height; i += 30) {
    rect(-width / 2, i + ((speed * 2) % height) + diff, width, 15);
  }
  pop();

  drawText();
  image(cache, 0, 0);

  speed += 1;
}

function drawText() {
  cache.clear();
  cache.noStroke();

  cache.fill(255);
  cache.push();
  // cache.translate(width / 2, height / 2);
  if (key === "a") {
    cache.rotate(radians(45));
  } else if (key === "s") {
    cache.rotate(radians(90));
  } else if (key === "d") {
    cache.rotate(radians(-45));
  }
  for (let i = -height; i < height; i += 15) {
    cache.rect(0, i + (speed % height), width, 5);
  }
  cache.pop();

  cache.fill(0, 0, 0, 255);
  cache.text("Shinonome \nCinnamon", 185, 185);

  cache.loadPixels();

  pixelsImage =
    4 * cache.width * displayDensity() * cache.height * displayDensity();

  i = 0;
  while (i < pixelsImage) {
    const r = cache.pixels[i];
    const g = cache.pixels[i + 1];
    const b = cache.pixels[i + 2];
    if (r == 255 && g == 255 && b == 255) {
      cache.pixels[i] = 255;
      cache.pixels[i + 1] = 255;
      cache.pixels[i + 2] = 255;
    } else {
      cache.pixels[i] = 0;
      cache.pixels[i + 1] = 0;
      cache.pixels[i + 2] = 0;
      cache.pixels[i + 3] = 255 - cache.pixels[i + 3];
    }
    i += 4;
  }
  cache.updatePixels();
}
