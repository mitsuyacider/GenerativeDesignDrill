let font;
let fontSize = 150;
let offset;
let pallet = ["#917347", "#9e3b36", "#231815", "#bc848a", "#548c9a", "#595757"];

// let points;
// let bounds;
function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const bg = random(pallet);
  const strokePallet = pallet.filter((n) => n !== bg);

  background(bg);

  noFill();
  stroke(random(strokePallet));

  // NOTE: MITSUYA
  let str = "MITSUYA";
  let margin = 20;
  let points = font.textToPoints(str, 0, 0, fontSize, {
    sampleFactor: 10,
    simplifyThreshold: 0,
  });
  let bounds = font.textBounds(str, 0, 0, fontSize);

  for (let i = 0; i < 10; i++) {
    const isCollapse = i === 0;
    drawText(
      points,
      width / 2 - bounds.w / 2,
      height / 2 - i * margin,
      isCollapse
    );
  }

  // NOTE: BAUHAUS
  str = "BAUHAUS";
  points = font.textToPoints(str, 0, 0, fontSize, {
    sampleFactor: 10,
    simplifyThreshold: 0,
  });
  bounds = font.textBounds(str, 0, 0, fontSize);

  for (let i = 0; i < 10; i++) {
    const isCollapse = i === 0;

    drawText(
      points,
      width / 2 - bounds.w / 2,
      height / 2 + 80 + i * margin,
      isCollapse
    );
  }
}

function drawText(points, x, y, isCollapse) {
  push();
  beginShape();
  translate(x, y);

  for (let i = 0; i < points.length; i += 10) {
    let p = points[i];

    if (isCollapse) {
      vertex(p.x + (sin(20 * p.y + millis() / 1000) * fontSize) / 15, p.y);
    } else {
      vertex(p.x, p.y);
    }
  }
  endShape(CLOSE);
  pop();
}
