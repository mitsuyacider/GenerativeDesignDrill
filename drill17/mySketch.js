let graphic;

let pallet = ["#C39043", "#C13A36", "#946F29"];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(random(pallet));

  graphic = createGraphics(width, height);

  noLoop();
  for (let i = 0; i < 400; i++) {
    fill(random(pallet));
    noStroke();
    ellipse(random(width), random(height), random(50));
  }

  drawText();
}

function drawText() {
  graphic.background(random(pallet));

  graphic.noStroke();
  graphic.textSize(100);
  graphic.textStyle(BOLD);
  graphic.drawingContext.shadowColor = color(0, 0, 0, 100);
  graphic.drawingContext.shadowBlur = 20;
  graphic.textAlign(CENTER, CENTER);
  graphic.text("MITSUYA", width / 2, height / 2 - 50);
  graphic.text("BAUHAUS", width / 2, height / 2 + 50);

  graphic.erase();
  graphic.text("MITSUYA", width / 2, height / 2 - 50);
  graphic.text("BAUHAUS", width / 2, height / 2 + 50);
  graphic.noErase();

  image(graphic, 0, 0);
}
