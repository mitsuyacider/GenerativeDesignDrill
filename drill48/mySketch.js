// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Grid010 from "./Grid010.js";
import Particle000 from "./Particle000.js";

let gridPallet = [];
let graphic;
let pallet;
const step = 100;
let num = 100;

let bg;
let particles = [];
function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  pallet = ColorPallet.getPallet();
  bg = hexToRgb(pallet[0].toString());
  background(bg.r, bg.g, bg.b);
  // background(0, 100, 100);
  angleMode(DEGREES);
  graphic = createGraphics(width, height);

  for (let i = 0; i < num; i++) {
    let particle = new Particle000();
    particle.fill = random(pallet);
    particle.gradient = random(pallet);
    particles.push(particle);
  }
  textFont("Helvetica");
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
  textSize(140);
  textStyle(BOLD);

  push();
  let value = random(pallet);
  // fill(bg.r, bg.g, bg.b, 0.5);
  fill(0);
  // stroke(value);
  // noStroke();
  drawingContext.shadowColor = color(255, 0, 0);
  drawingContext.shadowBlur = 15;
  // drawingContext.filter = "blur(2px)";
  // drawingContext.globalCompositeOperation = "xor";
  // drawingContext.globalCompositeOperation = "multiply";
  drawingContext.globalCompositeOperation = "overlay";

  textAlign(CENTER, CENTER);
  text("MITSUYA", width / 2, height / 2 - 70);
  text("BAUHAUS", width / 2, height / 2 + 70);
  pop();
}

function draw() {
  background(bg.r, bg.g, bg.b, 0.04);
  // background(0, 100, 100, 0.04);
  randomSeed(0);

  particles.map((particle) => {
    particle.update();
    particle.display();
    particle.checkEdge();
  });
  drawText();
}

window.setup = setup;
window.draw = draw;
