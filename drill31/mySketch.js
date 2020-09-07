let font;
let offset;
let pallet = ["#BB551f", "#f19069", "#aab559", "#dfb735", "#8f79b6"];
const fontSize = 180;
const minFontSize = 14;

var spacing = 2; // line height
var tracking = 0; // between letters

function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const bg = random(pallet);
  const strokePallet = pallet.filter((n) => n !== bg);

  background(bg);
  angleMode(DEGREES); // Change the mode to DEGREES

  fill(random(strokePallet));
  stroke(random(strokePallet));

  offset = (windowWidth - 700) / 2;

  const gap = 100;

  drawText("MITSUYA", height / 2 - gap);
  drawText("BAUHAUS", height / 2 + gap);
}

function drawChar(str, x, y) {
  let points = font.textToPoints(str, 0, 0, fontSize, {
    sampleFactor: 8,
    simplifyThreshold: 0,
  });
  let bounds = font.textBounds(str, 0, 0, fontSize);

  textFont(font, fontSize);

  push();

  textSize(fontSize);
  // text(str, x, y);

  textSize(minFontSize);
  translate(x, y);
  noFill();
  strokeWeight(3);
  beginShape();

  for (let i = 0; i < points.length; i += 20) {
    let p = points[i];
    push();
    translate(p.x, p.y);
    let rad = atan2(-bounds.h / 2 - p.y, bounds.w / 2 - p.x);
    rotate(rad);
    noFill();
    strokeWeight(random(1, 5));
    const alpha = map(i, 0, points.length, 0, 45);
    stroke(0, 0, 0, alpha);
    rect(p.x, p.y, 48, 48);
    pop();
    // fill(random(pallet))
    line(bounds.w / 2, -bounds.h / 2, p.x, p.y);

    vertex(p.x, p.y);
  }

  endShape();

  pop();
}

function drawText(str, posY) {
  push();
  spacing = 2;
  // translate(100, posY);
  textFont(font, fontSize);
  var x = 0;
  var y = 0;

  let bounds = font.textBounds(str, 0, 0, fontSize);
  const startX = (width - bounds.w) / 2;
  for (var i = 0; i < str.length; i++) {
    var letter = str.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth + offset * 2 > width) {
      // start new line and add line height
      x = 0;
      y += spacing;
    }

    // draw letter
    // text(letter, x + offset, posY);
    drawChar(letter, startX + x, posY);

    // update x-coordinate for next letter
    x += letterWidth;
  }

  pop();
}
