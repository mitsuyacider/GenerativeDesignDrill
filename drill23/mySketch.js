let graphic;

let pallet = ["#0060A3", "#958D35", "#EC954D", "#333f69", "#7e9a6c"];
let pallet2 = ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"];
let pallet3 = ["#C79653", "#000000", "##CE4C48", "#C79653"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(random(pallet));
  angleMode(DEGREES);
  graphic = createGraphics(width, height);
  graphic.angleMode(DEGREES);
  noLoop();

  graphic.background(random(pallet2));

  const offset = 250;
  for (let i = 0; i < 100; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(50, 300);
    drawSpotLight(x, y, size);
  }
  drawText();
}

function drawSpotLight(x, y, size) {
  // noStroke();
  let from = color(random(pallet));
  let to = color(random(pallet3));
  noFill();
  for (let i = 0; i < size; i++) {
    const interA = lerpColor(from, to, map(i, 0, size, 0, 1));

    stroke(interA);
    circle(x, y, i);
  }
}

function drawText() {
  const textSize = 100;
  const textGap = 80;

  const c = random(pallet2);
  // fill(c);
  graphic.noStroke();
  graphic.textSize(textSize);
  graphic.textStyle(BOLD);
  graphic.textAlign(CENTER, CENTER);

  graphic.erase();
  graphic.textSize(textSize + 20);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);
  graphic.noErase();

  image(graphic, 0, 0);
}
