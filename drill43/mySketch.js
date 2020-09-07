// https://www.youtube.com/watch?v=ZI1dmHv3MeM

import ColorPallet from "./ColorPallet.js";
import Grid009 from "./Grid009.js";
let gridPallet = [];
let graphic;
let pallet;
const step = 100;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  // background(ColorPallet.getRandom());
  // background(0);
  angleMode(DEGREES);
  graphic = createGraphics(width, height);

  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      // let grid = GridPallet.getRandom(i, j, step, step);
      let grid = new Grid009(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }

  textFont("Helvetica");
  // drawText();

  noLoop();
}

function drawText() {
  stroke(255);
  strokeWeight(4);
  noFill();
  textSize(100);
  textStyle(BOLD);

  let value = random(ColorPallet.getRandom());
  fill(value);
  stroke(0);
  drawingContext.shadowColor = color(255, 0, 0);
  drawingContext.shadowBlur = 10;
  drawingContext.filter = "blur(8px)";
  drawingContext.globalCompositeOperation = "lighter";

  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2 - 10, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
}

function draw() {
  background(255, 0.1);
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
