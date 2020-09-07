
import Grid from './Grid.js'
import GridPallet from './GridPallet.js'
let gridPallet = []
let pallet = ["#C39043", "#C13A36", "#946F29"];
let pallet2 = ["#917347", "#9e3b36", "#231815"];
let pallet3 = ["#bc848a", "#548c9a", "#595757"];
let graphic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  background(random(pallet));

  graphic = createGraphics(width, height);

  const step = 15
  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {      
      let grid = GridPallet.getRandom(i, j, step, step)
      gridPallet.push(grid)

      grid.draw(random(pallet2), random(pallet3))
    }
  }

  drawText()


  
}

function drawText() {
  graphic.background(random(pallet));

  noStroke();
  textSize(100);
  textStyle(BOLD);
  drawingContext.shadowColor = color(0, 0, 0, 100);
  drawingContext.shadowBlur = 20;
  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2, height / 2 - 50);
  text("BAUHAUS", width / 2, height / 2 + 50);
}

// function draw() {
//   background(0, 10)

// }

window.setup = setup
// window.draw = draw