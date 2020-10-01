"use strict";

import ParticleSystem from "./ParticleSystem.js";
import ColorPallet from "./ColorPallet.js";

let ps;
let pallet;

let bg;

let font;
let fontSize = 180;

let psFactory = [];
let psNum = 15;

function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf");
}

function setup() {
  createCanvas(800, 800);

  setupText();

  for (let i = 0; i < psNum; i++) {
    let ps = new ParticleSystem(createVector(width / 2, height / 2));
    psFactory.push(ps);
  }
  ps = new ParticleSystem(createVector(width / 2, height / 2));
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
  // fill(value);
  fill(0);

  text("MITSUYA", width / 2, height / 2 - 20);
  text("BAUHAUS", width / 2, height / 2 + 120);
  pop();
}

function setupText() {
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
}

function draw() {
  background(255);

  drawText();

  const gravity = createVector(0, 0.1);
  ps.addParticle();
  ps.applyForce(gravity);
  ps.run();

  for (let ps of psFactory) {
    const gravity = createVector(0, 0.1);
    ps.addParticle();
    ps.applyForce(gravity);
    ps.run();
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
