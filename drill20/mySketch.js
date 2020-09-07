let graphic;

let pallet = ["#0060A3", "#958D35", "#EC954D", "#333f69", "#7e9a6c"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(random(pallet));
  angleMode(DEGREES);
  graphic = createGraphics(width, height);
  graphic.angleMode(DEGREES);
  noLoop();

  graphic.background(random(pallet));

  drawAscii();
  drawText();
}

function drawAscii() {
  const size = 20;
  textSize(size);

  const step = 20;
  // 33 - 126
  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      const charCode = Math.floor(random(33, 126));
      fill(random(pallet));
      text(char(charCode), i, j);
    }
  }
}

function drawText() {
  const textSize = 150;
  const textGap = 80;

  const c = random(pallet);
  graphic.noStroke();
  graphic.textSize(textSize);
  graphic.textStyle(BOLD);
  graphic.textAlign(CENTER, CENTER);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);

  graphic.erase();
  graphic.drawingContext.shadowColor = color(c);
  graphic.drawingContext.shadowBlur = 10;
  graphic.textSize(textSize + 20);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);
  graphic.noErase();

  image(graphic, 0, 0);
}
