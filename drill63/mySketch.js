// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Grid011 from "./Grid011.js";

import Oscillator002 from "./Oscillator002.js";
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

  // background(bg.r, bg.g, bg.b);
  background(0, 0, 0);
  textFont(font, fontSize);
  textStyle(BOLD);
  textAlign(CENTER);

  const dataset = {
    x: 0,
    y: 0,
    w: width / 2,
    h: height / 8,
    step: 2,
    amplitude: 0,
  };

  oscillator = new Oscillator002(dataset);
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

  drawOscillator();
}

function drawOscillator() {
  const mouse = createVector(mouseX, mouseY);
  const dir = p5.Vector.sub(mouse, oscillator.pos);
  dir.normalize();
  dir.mult(0.5);
  // oscillator.applyForce(dir)
  oscillator.update();
  oscillator.checkEdge();
  oscillator.display();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
