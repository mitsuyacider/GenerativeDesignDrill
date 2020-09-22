// https://www.youtube.com/watch?v=ZI1dmHv3MeM
// https://natureofcode.com/book/chapter-1-vectors/

import ColorPallet from "./ColorPallet.js";
import Particle001 from "./Particle001.js";
import Character002 from "./Character002.js";
import Liquid from "./Liquid.js";
import Attractor from "./Attractor.js";

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
  createParticleText(/* str = */ "MITSUYA", /* y = */ height / 2 - 20);
  createParticleText(/* str = */ "BAUHAUS", /* y = */ height / 2 + 120);

  attractor = new Attractor();
  // textFont("Helvetica");
  // noLoop();
}

function createParticleText(str, y) {
  let bounds = font.textBounds(str, 0, 0, fontSize);
  let startX = (width - bounds.w) / 2;

  let x = startX;
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    push();
    // let startX = (width - bounds.w) / 2;
    // // let startY = height / 2 + gap;
    // let x = startX;
    // let y = startY;
    // const letter = str;
    let points = font.textToPoints(letter, x, y, fontSize, {
      sampleFactor: 2,
      simplifyThreshold: 0,
    });

    let b = font.textBounds(letter, 0, 0, fontSize);

    const character = new Character002(points, liquid, b);
    characters.push(character);

    pop();
    x += textWidth(letter);
  }
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

  // drawParticles();
  drawText();

  drawTextByPoints();

  attractor.display();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
