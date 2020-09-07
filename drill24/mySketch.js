let graphic;
let bgGraphic;

let pallet = ["#27120a", "#f0eb45", "#727172", "#333f69", "#7e9a6c"];
let pallet2 = ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(random(pallet2));
  angleMode(DEGREES);
  graphic = createGraphics(width, height);
  graphic.angleMode(DEGREES);
  noLoop();

  graphic.background(random(pallet2));

  drawText();

  drawBgGraphich();
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

  const c = random(pallet);
  // fill(c);
  graphic.strokeWeight(4);
  graphic.stroke(random(pallet2));
  graphic.textSize(textSize);
  graphic.textStyle(BOLD);
  graphic.textAlign(CENTER, CENTER);
  graphic.fill(c);
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
