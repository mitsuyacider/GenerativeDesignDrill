// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Grid010 from "./Grid010.js";
let gridPallet = [];
let graphic;
let pallet;
const step = 100;

let bg;

let accelarate;
let loc;
let velocity;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  bg = hexToRgb(pallet[0].toString());
  background(bg.r, bg.g, bg.b);
  angleMode(DEGREES);
  graphic = createGraphics(width, height);

  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      let grid = new Grid010(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }

  textFont("Helvetica");
  // drawText();

  accelarate = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
  loc = createVector();
  velocity = createVector(2.5, 5);
  // noLoop();
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function drawText() {
  strokeWeight(4);
  textSize(100);
  textStyle(BOLD);

  push();
  let value = random(pallet);
  // fill(bg.r, bg.g, bg.b, 0.5);
  fill(value);
  stroke(value);
  drawingContext.shadowColor = color(255, 0, 0);
  // drawingContext.shadowBlur = 30;
  // drawingContext.filter = "blur(8px)";
  // drawingContext.globalCompositeOperation = "xor";
  // drawingContext.globalCompositeOperation = "multiply";
  drawingContext.globalCompositeOperation = "overlay";

  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2 - 10, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
  pop();
}

function draw() {
  background(bg.r, bg.g, bg.b, 0.04);
  randomSeed(0);

  velocity.add(accelarate);
  loc.add(velocity);

  ellipse(loc.x, loc.y, 10, 10);

  ellipse(mouseX, mouseY, 20);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);
  // mouse.mult(0.5);
  // mouse.normalize()
  mouse.limit(300);
  push();
  translate(width / 2, height / 2);
  stroke(255);
  line(0, 0, mouse.x, mouse.y);
  pop();

  let ball = createVector(loc.x, loc.y);
  ball.sub(center);
  ball.limit(300);
  push();
  translate(width / 2, height / 2);
  line(0, 0, ball.x, ball.y);
  pop();

  if (loc.x > width) {
    velocity.x *= -1;
    loc.x = width;
  }

  if (loc.x < 0) {
    velocity.x *= -1;
    loc.x = 0;
  }

  if (loc.y > height) {
    velocity.y *= -1;
    loc.y = height;
  }

  if (loc.y < 0) {
    velocity.y *= -1;
    loc.y = 0;
  }

  drawText();
}

window.setup = setup;
window.draw = draw;
