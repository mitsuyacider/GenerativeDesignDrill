let font;
let offset;
let pallet = ["#BB551f", "#f19069", "#aab559", "#dfb735", "#8f79b6"];
const fontSize = 180
const minFontSize = 14

var spacing = 2; // line height
var tracking = 0; // between letters
let bg
function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = random(pallet);
  const strokePallet = pallet.filter((n) => n !== bg);

  background(bg);
  angleMode(DEGREES); // Change the mode to DEGREES

  fill(random(strokePallet));
  stroke(random(strokePallet));

  offset = (windowWidth - 700) / 2;

  const gap = 100;

  drawText('MITSUYA', height / 2 - gap);
  drawText('BAUHAUS', height / 2 + gap);
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
  text(str, x, y);

  textSize(minFontSize);
  translate(x, y);
  noFill()
  // strokeWeight(3)
  
  for (let i = 0; i < points.length; i += 10) {
    let p = points[i];
    beginShape();
    stroke(0, 5);
    strokeWeight(random(1, 5))
    curveVertex(p.x, p.y)
    curveVertex(p.x, p.y)
    curveVertex(width / 2, height /4)

    // line(bounds.w / 2, -bounds.h / 2, p.x, p.y);

    // line(width / 2, height /2, p.x, p.y);

    for (let k = 0; k < 3; k++) {
      curveVertex(random(-width / 2, width) , random(height / 2))
    }
    // curveVertex(-width / 2 , 100)
    endShape();


    // beginShape();
    // stroke(bg);
    // strokeWeight(random(1, 5))
    // curveVertex(p.x, p.y)
    // curveVertex(p.x, p.y)
    // curveVertex(width / 2, height /4)

    // // line(bounds.w / 2, -bounds.h / 2, p.x, p.y);

    // // line(width / 2, height /2, p.x, p.y);

    // for (let k = 0; k < 2; k++) {
    //   curveVertex(random(-width / 2, width) , random(height / 2))
    // }
    // // curveVertex(-width / 2 , 100)
    // endShape();

  }

  pop();

  fill(255)
  text(str, x, y);

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
    drawChar(letter, startX + x , posY);

    // update x-coordinate for next letter
    x += letterWidth;
  }

  pop();
}
