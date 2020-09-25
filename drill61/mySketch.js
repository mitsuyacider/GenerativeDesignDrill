// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Grid011 from "./Grid011.js";

import Oscillator001 from "./Oscillator001.js";
let gridPallet = [];

let pallet;

let bg;

let font;
let fontSize = 180;
const step = 100;

let oscillator;

function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(800, 800);
  // colorMode(HSB);
  pallet = ColorPallet.getPallet();

  const index = Math.floor(random(pallet.length));
  bg = hexToRgb(pallet[index].toString());

  // NOTE: recreate pallet without bg color
  pallet = pallet.filter((e, i) => i !== index);

  background(bg.r, bg.g, bg.b);
  textFont(font, fontSize);
  textStyle(BOLD);
  textAlign(CENTER);

  for (let i = 0; i < width; i += step) {
    for (let j = 0; j < height; j += step) {
      // let grid = GridPallet.getRandom(i, j, step, step);
      let grid = new Grid011(i, j, step, step);
      gridPallet.push(grid);

      grid.draw(random(pallet), random(pallet));
    }
  }
  oscillator = new Oscillator001();
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

function drawGrid() {
  for (let i = 0; i < gridPallet.length; i++) {
    const grid = gridPallet[i];
    grid.draw();
  }
}

function drawText() {
  strokeWeight(4);
  textSize(fontSize);
  textStyle(BOLD);

  // NOTE: Without push/pop, the fps would slow down...
  push();
  let value = random(pallet);
  fill(value);
  // fill(0);

  text("MITSUYA", width / 2, height / 2 - 20);
  text("BAUHAUS", width / 2, height / 2 + 120);
  pop();
}

function draw() {
  background(bg.r, bg.g, bg.b);
  randomSeed(0);

  drawText();

  drawGrid();
  // drawOscillator();
}

function drawOscillator() {
  oscillator.display();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
