import BaseGrid from "./BaseGrid.js";
import GridPallet from "./GridPallet.js";
import ColorPallet from "./ColorPallet.js";
import Grid002 from "./Grid002.js";
import Grid003 from "./Grid003.js";
let gridPallet = [];
let graphic;
let pallet;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  // background(random(pallet));
  background(0);
  // angleMode(DEGREES);
  graphic = createGraphics(width, height);

  const step = 80;
  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      // let grid = GridPallet.getRandom(i, j, step, step);
      let grid = new Grid003(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }

  textFont("Georgia");
  drawText();
}

function drawText() {
  graphic.background(random(pallet));

  // noStroke();
  stroke(ColorPallet.getRandom());
  strokeWeight(4);
  textSize(100);
  textStyle(BOLD);

  const value = random(ColorPallet.getRandom());
  fill(0);
  drawingContext.shadowColor = color(0, 0, 0, 100);
  drawingContext.shadowBlur = 20;
  // drawingContext.filter = "blur(2px)";
  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
}

function draw() {
  background(0, 10);
  randomSeed(10);

  const step = 40;
  for (let i = 0; i < gridPallet.length; i++) {
    const grid = gridPallet[i];
    grid.draw();
  }

  drawText();
}

window.setup = setup;
window.draw = draw;
