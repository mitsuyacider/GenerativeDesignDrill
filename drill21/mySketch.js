let graphic;

let pallet = ["#0060A3", "#958D35", "#EC954D", "#333f69", "#7e9a6c"];
let pallet2 = ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"];

let bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = random(pallet2);
  background(bgColor);
  angleMode(DEGREES);
  graphic = createGraphics(width, height);
  graphic.angleMode(DEGREES);
  noLoop();

  graphic.background(bgColor);

  const offset = 250;
  drawSpotLight(width / 2 - offset, height / 2, 300);
  drawSpotLight(width / 2, height / 2, 300);
  drawSpotLight(width / 2 + offset, height / 2, 300);

  drawText();
}

function drawSpotLight(x, y, size) {
  fill(random(pallet));
  noStroke();
  circle(x, y, size);
}

function drawText() {
  const textSize = 150;
  const textGap = 80;

  const c = random(pallet);
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
