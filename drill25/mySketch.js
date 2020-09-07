let cellSize = 5;
let zseed = 0;
const inc = 0.09;

let xOffset = 0;
let yOffset = 0;

let graphic;
let bgGraphic;

let pallet = ["#bbbcde", "#d2c3d9", "#b60005"];
let pallet2 = ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"];
let textColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(random(pallet2));
  angleMode(DEGREES);
  textColor = random(pallet);
  graphic = createGraphics(width, height);
  graphic.angleMode(DEGREES);

  graphic.background(random(pallet2));

  // HSB colormode stands for hue, saturation, brightness
  // hue goes from 0 (red) - 360 (also red) 180 is cyan
  // saturation goes from 0 - 100 (black and white to color)
  // brightness goes from 0 - 100 (black to white)
  colorMode(HSB);

  background(255);
  noStroke();

  drawText();

  drawBgGraphich();
  drawNoise();

  noLoop();
}

function draw() {
  background(255);
  noStroke();

  drawText();
  drawBgGraphich();
  drawNoise();
}

function drawNoise() {
  yOffset = 0;
  for (let y = 0; y < height; y += cellSize) {
    xOffset = 0;
    for (let x = 0; x < width; x += cellSize) {
      let fillCol = noise(xOffset, yOffset, zseed) * 360;
      let saturation = noise(xOffset, yOffset, zseed) * 100;
      let brightness = noise(xOffset, yOffset, zseed) * 100;
      fill(fillCol, saturation, brightness, 0.3);
      rect(x, y, cellSize, cellSize);
      xOffset += inc;
    }

    yOffset += inc;
  }
  zseed += inc;
}

function drawBgGraphich() {
  bgGraphic = createGraphics(width, height);
  bgGraphic.colorMode(HSB, 360, 100, 100, 100);
  bgGraphic.angleMode(DEGREES);
  bgGraphic.stroke(0, 0, 0, 2);
  for (let i = 0; i < (width * height * 0.5) / 100; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(360) + random(10) * (random(100) > 50 ? -1 : 1);
    let d = width / 5;
    bgGraphic.line(
      x + cos(angle) * d,
      y + sin(angle) * d,
      x + cos(angle + 180) * d,
      y + sin(angle + 180) * d
    );
  }

  image(bgGraphic, 0, 0);
}

function drawText() {
  const textSize = 100;
  const textGap = 80;

  // fill(c);
  graphic.strokeWeight(4);
  graphic.stroke(random(pallet2));
  graphic.textSize(textSize);
  graphic.textStyle(BOLD);
  graphic.textAlign(CENTER, CENTER);
  graphic.fill(textColor);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);
  graphic.strokeJoin(ROUND);

  graphic.erase(40, 255);
  graphic.strokeWeight(6);
  graphic.textSize(textSize);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);
  graphic.noErase();

  image(graphic, 0, 0);
}
