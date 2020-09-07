// https://www.youtube.com/watch?v=ZI1dmHv3MeM

import ColorPallet from "./ColorPallet.js";
import Grid008 from "./Grid008.js";
let gridPallet = [];
let graphic;
let pallet;
const step = 300;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  background(ColorPallet.getRandom());
  // background(0);
  angleMode(DEGREES);
  graphic = createGraphics(width, height);

  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      // let grid = GridPallet.getRandom(i, j, step, step);
      let grid = new Grid008(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }

  textFont("Helvetica");
  // drawText();

  // noLoop();
}

function drawText() {
  stroke(255);
  strokeWeight(4);
  noFill();
  textSize(100);
  textStyle(BOLD);

  const value = random(ColorPallet.getRandom());
  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
}

function draw() {
  background(255, 0.01);
  randomSeed(0);

  const step = 40;
  for (let i = 0; i < gridPallet.length; i++) {
    const grid = gridPallet[i];
    grid.draw();
  }

  drawText();
}

window.setup = setup;
window.draw = draw;
