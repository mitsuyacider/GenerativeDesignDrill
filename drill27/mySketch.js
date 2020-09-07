// Reference: http://www.generative-gestaltung.de

"use strict";

var textTyped =
  "Type slow and fast! Type slow and fast!Type slow and fast! Type slow and fast!Type slow and fast! Type slow and fast!Type slow and fast! Type slow and fast!";
var fontSizes = [textTyped.length];
var minFontSize = 6;
var maxFontSize = 50;
var newFontSize = 0;

var pMillis = 0;
var maxTimeDelta = 5000.0;

var spacing = 2; // line height
var tracking = 0; // between letters
var font;

let offset;

function setup() {
  createCanvas(windowWidth, windowHeight);

  offset = (windowWidth - 700) / 2;
  font = "Times";

  noCursor();
  noStroke();

  // init fontSizes
  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = random(minFontSize, maxFontSize) + noise(minFontSize) * 12;
  }

  const gap = 120;

  drawText(height / 2 - gap);
  drawText(height / 2 + gap);

  // fill(255, 0, 0);
  push();
  textFont(font, 200);
  translate(0, height / 2 - gap);
  textSize(150);
  textAlign(CENTER);
  text("MITSUYA", width / 2, 10);
  text("BAUHAUS", width / 2, gap * 2 + 10);
  pop();
}

function drawText(posY) {
  textAlign(LEFT);
  fill(0);
  push();
  spacing = 5;
  translate(0, posY);

  var x = 0;
  var y = 0;
  var fontSize = 20;

  for (var i = 0; i < textTyped.length; i++) {
    // get fontsize for the actual letter from the array
    fontSize = fontSizes[i];
    // if (fontSize > 100) {
    //   textStyle(BOLD);
    // } else {
    //   textStyle(NORMAL);
    // }

    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth + offset * 2 > width) {
      // start new line and add line height
      x = 0;
      y += spacing;
    }

    // draw letter
    text(letter, x + offset, y);
    // update x-coordinate for next letter
    x += letterWidth;
  }

  pop();
}
