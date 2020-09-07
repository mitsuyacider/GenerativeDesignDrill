import BaseGrid from "./BaseGrid.js";
import GridPallet from "./GridPallet.js";
import ColorPallet from "./ColorPallet.js";
import Grid002 from "./Grid002.js";
let gridPallet = [];
let graphic;
let pallet;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  background(random(pallet));

  graphic = createGraphics(width, height);

  const step = 55;
  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      // let grid = GridPallet.getRandom(i, j, step, step);
      let grid = new Grid002(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }

  drawText();
}

function drawText() {
  graphic.background(random(pallet));

  noStroke();
  textSize(100);
  textStyle(BOLD);
  fill(random(ColorPallet.getRandom()));
  drawingContext.shadowColor = color(0, 0, 0, 100);
  drawingContext.shadowBlur = 20;
  drawingContext.filter = "blur(2px)";
  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
}

// function draw() {
//   background(0, 10)

// }

window.setup = setup;
// window.draw = draw
