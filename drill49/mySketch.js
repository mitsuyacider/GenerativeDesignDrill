// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Grid010 from "./Grid010.js";
import Particle001 from "./Particle001.js";

let gridPallet = [];
let graphic;
let pallet;
const step = 100;
let num = 50;
let xOffset = 0;
let yOffset = 0;
let zOffset;

let bg;
let particles = [];
let noiseMax;
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
    let particle = new Particle001();
    particle.fill = random(pallet);
    particle.gradient = random(pallet);
    particles.push(particle);
  }

  noiseMax = random(5, 500);
  xOffset = random(0.01, 0.05);
  yOffset = random(0.01, 0.05);
  zOffset = random(0.01, 0.05);
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
  background(bg.r, bg.g, bg.b);
  // background(0, 100, 100, 0.04);
  randomSeed(0);
  const gradient = drawingContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `rgb(${bg.r}, ${bg.g}, ${bg.b})`);
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 100)");
  gradient.addColorStop(1, `rgb(${bg.r}, ${bg.g}, ${bg.b})`);
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  // xOffset = 0;
  // yOffest = 0;
  particles.map((particle, i) => {
    const n = noise(xOffset, yOffset);
    // xOffset = map(cos(i), -1, 1, 0, noiseMax);
    // yOffset = map(sin(i), -1, 1, 0, noiseMax);
    let r = map(noise(xOffset, yOffset, zOffset), 0, 1, -0.001, -0.005);
    const x = r * cos(i);
    const y = r * sin(i);

    const wind = createVector(random(-0.001, 0.001), r);

    particle.applyForce(wind);
    particle.update();
    particle.display();
    particle.checkEdge();
  });

  yOffset += 0.0001;
  drawText();
}

window.setup = setup;
window.draw = draw;
