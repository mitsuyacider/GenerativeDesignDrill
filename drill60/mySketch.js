// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Particle005 from "./Particle005.js";
import Character003 from "./Character003.js";
import Liquid from "./Liquid.js";
import Attractor from "./Attractor.js";

let gridPallet = [];
let graphic;
let pallet;
const step = 100;
let num = 500;
let xOffset = 0;
let yOffset = 0;
let zOffset;

let bg;
let particles = [];
let noiseMax;
let font;
let fontSize = 180;

let characters = [];

let attractor;

function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(800, 800);
  // colorMode(HSB);
  pallet = ColorPallet.getPallet();
  bg = hexToRgb(pallet[0].toString());
  background(bg.r, bg.g, bg.b);
  // background(0, 100, 100);
  // angleMode(DEGREES);
  graphic = createGraphics(width, height);

  for (let i = 0; i < num; i++) {
    const pos = createVector(random(width), random(height));
    const mass = random(5, 20);
    let particle = new Particle005(pos, mass);
    particle.fill = random(pallet);
    particle.gradient = random(pallet);
    particles.push(particle);
  }

  noiseMax = random(5, 500);
  xOffset = random(0.01, 0.05);
  yOffset = random(0.01, 0.05);
  zOffset = random(0.01, 0.05);

  textFont(font, fontSize);
  textStyle(BOLD);
  textAlign(CENTER);
  ellipseMode(CENTER);

  attractor = new Attractor();
  // textFont("Helvetica");
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

function drawTextByPoints() {
  for (let i = 0; i < characters.length; i++) {
    const c = characters[i];
    c.display();
  }
}

function drawText() {
  strokeWeight(4);
  textSize(fontSize);
  textStyle(BOLD);

  // NOTE: Without push/pop, the fps would slow down...
  push();
  let value = random(pallet);
  // fill(bg.r, bg.g, bg.b, 0.5);
  fill(0);

  text("MITSUYA", width / 2, height / 2 - 20);
  text("BAUHAUS", width / 2, height / 2 + 120);
  pop();
}

function draw() {
  background(bg.r, bg.g, bg.b);
  // background(0, 100, 100, 0.04);
  randomSeed(0);

  drawParticles();
  drawText();

  // drawTextByPoints();

  drawAttractor();
}

function drawAttractor() {
  const n = noise(xOffset, yOffset);
  // xOffset = map(cos(i), -1, 1, 0, noiseMax);
  // yOffset = map(sin(i), -1, 1, 0, noiseMax);
  let r = map(noise(xOffset, yOffset, zOffset), 0, 1, -0.5, 0.8);
  const x = r * cos(xOffset + n);
  const y = r * sin(yOffset + n);
  const wind = createVector(x, y);

  // const wind = createVector(random(-0.01, 0.1), r);
  attractor.applyForce(wind);
  attractor.update();
  attractor.checkEdge();
  attractor.display();

  xOffset += 0.005;
  yOffset += 0.008;
}

function drawParticles() {
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
    let r = map(noise(xOffset, yOffset, zOffset), 0, 1, -0.0001, -0.0005);
    const x = r * cos(i);
    const y = r * sin(i);

    const wind = createVector(random(-0.001, 0.001), r);
    const force = attractor.attract(particle);
    particle.applyForce(force);
    particle.applyForce(wind);
    particle.update();
    particle.display();
    particle.checkEdge();
  });

  yOffset += 0.0001;
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
