// https://www.youtube.com/watch?v=ZI1dmHv3MeM

import ColorPallet from "./ColorPallet.js";
import Grid010 from "./Grid010.js";
let gridPallet = [];
let graphic;
let pallet;
const step = 100;

let bg;
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
  background(bg.r, bg.g, bg.b, 0.1);
  randomSeed(0);

  const step = 40;
  for (let i = 0; i < gridPallet.length; i++) {
    const grid = gridPallet[i];
    grid.update();
    grid.draw();
  }

  drawText();
}

window.setup = setup;
window.draw = draw;
