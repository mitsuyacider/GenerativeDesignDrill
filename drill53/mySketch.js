// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Particle001 from "./Particle001.js";
import Character from "./Character.js";
import Liquid from "./Liquid.js";

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
let font;
let fontSize = 180;

let characters = [];
let liquid;

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

  let str = "MITSUYA";

  textFont(font, fontSize);
  textStyle(BOLD);
  textAlign(CENTER);
  ellipseMode(CENTER);

  liquid = new Liquid(0, height / 2 - 150, width, 280, 0.01);
  createParticleText(/* str = */ "MITSUYA", /* y = */ fontSize - 70);
  createParticleText(/* str = */ "BAUHAUS", /* y = */ fontSize + 80);

  // textFont("Helvetica");
  // noLoop();
}

function createParticleText(str, y) {
  push();
  let bounds = font.textBounds(str, 0, 0, fontSize);
  let startX = (width - bounds.w) / 2;
  // let startY = height / 2 + gap;
  let x = startX;
  // let y = startY;
  const letter = str;
  let points = font.textToPoints(letter, x, y, fontSize, {
    sampleFactor: 2,
    simplifyThreshold: 0,
  });

  const character = new Character(points, liquid);
  characters.push(character);

  pop();
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
  // stroke(value);
  // noStroke();
  drawingContext.shadowColor = color(255, 0, 0);
  drawingContext.shadowBlur = 15;
  // drawingContext.filter = "blur(2px)";
  // drawingContext.globalCompositeOperation = "xor";
  // drawingContext.globalCompositeOperation = "multiply";
  drawingContext.globalCompositeOperation = "overlay";

  text("MITSUYA", width / 2, height / 2 - 20);
  text("BAUHAUS", width / 2, height / 2 + 120);
  pop();
}

function draw() {
  background(bg.r, bg.g, bg.b);
  // background(0, 100, 100, 0.04);
  randomSeed(0);

  // drawParticles();
  drawText();
  liquid.display();

  drawTextByPoints();

  // text("MITSUYA", width / 2, height / 2);

  // stroke(0, 100, 100);
  // line(0, height / 2, width, height / 2);
  // noLoop();
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

    if (particle.isInside(liquid)) {
      // console.log("hallo");
      particle.liquidFill = "#ff0000";
      particle.drag(liquid);
    } else {
      // console.log("hallo");
      // const dummy = createVector(0, -10);
      particle.liquidFill = undefined;
      particle.applyForce(particle.velocity);
    }

    particle.update();
    particle.display();
    particle.checkEdge();
  });

  yOffset += 0.0001;
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
