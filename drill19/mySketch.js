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

  const gap = 20;
  drawBorder(gap, 0, undefined);
  drawBorder(gap, gap, graphic);
  drawText();
}

function drawBorder(gap, offset, context) {
  const borderCount = height / gap;
  for (let i = 0; i < height * 2; i += gap) {
    if (context) {
      context.push();
      context.translate(context.width, 0);

      context.rotate(45);

      context.stroke(random(pallet));
      context.strokeWeight(random(5) + 1);
      context.line(-width, i + offset, width * 2, i + offset);
      context.pop();
    } else {
      push();
      translate(-width, 0);
      rotate(-45);

      stroke(random(pallet));
      strokeWeight(random(5) + 1);
      line(-width, i + offset, width, i + offset);
      pop();
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
