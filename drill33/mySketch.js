
let fontSize = 200;
let font;
let charSet = []

function preload() {
  font = loadFont("data/Inconsolata-ExtraBold.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  // noLoop();
  textFont(font, fontSize);

  let gap = 100
  createCharData(/*txt = */"MITSUYA", /* gap = */-gap)
  createCharData("FACTORY", gap)
}

function createCharData(txt, gap) {
  let bounds = font.textBounds(txt, 0, 0, fontSize);
  let startX = (width - bounds.w) / 2;
  let x = 0

  for (let i =0; i < txt.length; i++) {
    const char = txt.charAt(i)

    let pnts = getPoints(char);
    let originalPnts = getPoints(char);
    let angles = []
    let angleSpeeds = []
    let noiseFactors = []
  
    for (let i = 0; i < originalPnts.length; i++) {
      angles[i] = noise(i) * 360
      angleSpeeds[i] = random(-0.1, 0.1)
      noiseFactors[i] = random(-20, 10)
    }

    const c = color(random(255), random(255), random(255))
    const px = startX + x
    const py = height / 2 + gap
    const charData = {
      pnts,
      originalPnts,
      angles,
      angleSpeeds,
      noiseFactors,
      px,
      py,
      char,
      c
    }
    charSet.push(charData)

    x += textWidth(char);
  }
}

function drawNoise() {
  yOffset = 0;
  for (let y = 0; y < height; y += cellSize) {
    xOffset = 0;
    for (let x = 0; x < width; x += cellSize) {
      let fillCol = noise(xOffset, yOffset, zseed) * 360;
      let saturation = noise(xOffset, yOffset, zseed) * 100;
      let brightness = noise(xOffset, yOffset, zseed) * 100;
      fill(fillCol, saturation, brightness, 0.3);
      rect(x, y, cellSize, cellSize);
      xOffset += inc;
    }

    yOffset += inc;
  }
  zseed += inc;

  angleMode(DEGREES)
}

let xOffset = 0
let yOffset = 0
let inc = 0.005
let zOffset = 0
const mitsuyafactory = "MITSUYAFACTORY"

function draw() {
  background(0, 10)
  if (!font) return;

  noFill();

  for (let i = 0; i < mitsuyafactory.length; i++) {
    const charData = charSet[i]
    drawText(charData)
  }
}

function drawText(charData) {
  // const charData = charSet[str]

  let {
    pnts,
    originalPnts,
    angles,
    angleSpeeds,
    noiseFactors,
    px,
    py,
    c
  } = charData

 
  push();
  xOffset += inc
  yOffset += inc;

  translate(px, py);

  let noiseOffset = 100;
	const vertNum = 10;
	const radStep = TAU/vertNum;
	const minRadius = 10;
	const noiseScale = 2;
  const noiseZ = frameCount*0.01;
  

  // are there points to draw?
  if (pnts.length > 0) {
    // console.log('hallo')
    // let the points dance
    for (var i = 0; i < pnts.length; i++) {      
      let x = originalPnts[i].x
      let y = originalPnts[i].y
      
      // let additionalOffset = r > maxRad/2 ? 0 : 0.01;
      let additionalOffset =  0.01;
      let baseRadius = random(1, minRadius)
      let nv = noise(x * noiseScale + noiseOffset, y * noiseScale + additionalOffset, noiseZ);
			let noiseScale2 = map(nv, 0, 1, 0.01, 2);
			let nv2 = noise(x * noiseScale2 + noiseOffset, y * noiseScale2 , noiseZ);
			let radiusRatio = map(nv2, 0, 1, 0.5,1);
			let radius = baseRadius * radiusRatio;
      
      let angle = angles[i]
      angle += angleSpeeds[i]
      angles[i] = angle
      let nf = noiseFactors[i]
      x += cos(angle) * (nv2 * nf);
      y += sin(angle * 2) * (nv2 * nf);

      let s = noise(x*0.01, y*0.01)*2;
      pnts[i].x = x;
      pnts[i].y = y;
    }

    //  ------ lines: connected straight  ------
    // strokeWeight(0.1);
    // stroke(0);
    // beginShape();
    // for (var i = 0; i < pnts.length; i++) {
    //   vertex(pnts[i].x, pnts[i].y);
    //   ellipse(pnts[i].x, pnts[i].y, 7, 7);
    // }
    // vertex(pnts[0].x, pnts[0].y);
    // endShape();

    //  ------ lines: connected rounded  ------
    
      strokeWeight(0.08);

      beginShape();
      // start controlpoint
      curveVertex(pnts[pnts.length-1].x, pnts[pnts.length-1].y);
      // only these points are drawn
      // stroke(random(255), random(255), random(255))
      for (var i = 0; i < pnts.length; i++) {
        stroke(c)
        curveVertex(pnts[i].x, pnts[i].y);
      }
      curveVertex(pnts[0].x, pnts[0].y);
      // end controlpoint
      curveVertex(pnts[1].x, pnts[1].y);
      endShape();
    
  }

  pop();
}

function getPoints(char) {
  var path = font.textToPoints(char, 0, 0, fontSize, {
    sampleFactor: 10,
    simplifyThreshold: 0.01,
  });

  return path;
}