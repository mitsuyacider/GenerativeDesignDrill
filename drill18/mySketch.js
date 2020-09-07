let graphic;

let pallet = ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(random(pallet));

  graphic = createGraphics(width, height);

  noLoop();

  graphic.background(random(pallet));

  const gap = 10;
  drawBorder(gap, 0, undefined);
  drawBorder(gap, gap / 2, graphic);
  drawText();
}

function drawBorder(gap, offset, context) {
  const borderCount = height / gap;
  for (let i = 0; i < height; i += gap) {
    if (context) {
      context.stroke(random(pallet));
      context.strokeWeight(random(5) + 1);
      context.line(0, i + offset, width, i + offset);
    } else {
      stroke(random(pallet));
      strokeWeight(random(5) + 1);
      line(0, i + offset, width, i + offset);
    }
  }
}

function drawText() {
  const textSize = 150;
  const textGap = 80;

  graphic.noStroke();
  graphic.textSize(textSize);
  graphic.textStyle(BOLD);
  graphic.drawingContext.shadowColor = color(0, 0, 0, 100);
  graphic.drawingContext.shadowBlur = 20;
  graphic.textAlign(CENTER, CENTER);
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);

  graphic.erase();
  graphic.text("MITSUYA", width / 2, height / 2 - textGap);
  graphic.text("BAUHAUS", width / 2, height / 2 + textGap);
  graphic.noErase();

  image(graphic, 0, 0);
}
