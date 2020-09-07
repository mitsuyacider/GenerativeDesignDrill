// Reference : http://www.generative-gestaltung.de

"use strict";

let modules;
let moduleType = ["A"];
let activeModuleSet = "A";

let tileSize = 20;
let gridResolutionX;
let gridResolutionY;
let tiles = [];
let tileColors = [];
let tileType = [];
let activeTileColor;

let doDrawGrid = true;
let randomMode = false;
let isDebugMode = false;

let graphic;
let pallet = ["#bbbcde", "#d2c3d9", "#b60005"];
function preload() {
  modules = [];
  for (let i = 0; i < 1; i++) {
    modules[moduleType[i]] = [];
    for (let j = 0; j < 16; j++) {
      modules[moduleType[i]].push(
        loadImage("data/" + moduleType[i] + "_" + nf(j, 2) + ".svg")
      );
    }
  }
}

function setup() {
  let density = displayDensity();
  // pixelDensity(density);

  // use full window size
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(0.15);
  textSize(8);
  textAlign(CENTER, CENTER);
  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(height / tileSize) + 2;
  activeTileColor = color(0);

  // invert shape color so image tint can be applied
  for (let i = 0; i < moduleType.length; i++) {
    for (let j = 0; j < modules[moduleType[i]].length; j++) {
      modules[moduleType[i]][j].filter(INVERT);
    }
  }

  initTiles();
  graphic = createGraphics(width * density, height * density);
  graphic.background(255);

  drawGrid();
  drawText();
  drawPattern();
}

// function draw() {
//   background(360);

//   if (mouseIsPressed) {
//     if (mouseButton == LEFT) setTile();
//     if (mouseButton == RIGHT) unsetTile();
//   }

//   drawText();
//   drawPattern();

//   // drawGrid();

//   // drawModules();
// }

function setTileWithPoint(x, y) {
  // convert mouse position to grid coordinates
  let gridX = floor(x / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(y / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
  tileColors[gridX][gridY] = activeTileColor;
  if (randomMode) {
    tileType[gridX][gridY] = moduleType[int(random(moduleType.length))];
  } else {
    tileType[gridX][gridY] = activeModuleSet;
  }
}

function drawPattern() {
  graphic.loadPixels();

  for (let gridX = 1; gridX < gridResolutionX - 1; gridX++) {
    for (let gridY = 1; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles

      let posX = tileSize * gridX;
      let posY = tileSize * gridY;
      // let posX = tileSize * gridX - tileSize / 2;
      // let posY = tileSize * gridY - tileSize / 2;

      let hasText = false;
      for (let y = posY; y < posY + tileSize; y++) {
        for (let x = posX; x < posX + tileSize; x++) {
          const index = (x + y * width * 2) * 4;
          const brightness = graphic.pixels[index + 0];
          if (brightness === 0) {
            setTileWithPoint(x, y);
            hasText = true;
            break;
          }
        }
      }

      if (hasText) {
        fill(random(pallet));
        ellipse(posX, posY, 10);
      }

      if (tiles[gridX][gridY] != 0) {
        let binaryResult = "";
        // check the four neightbours, each can be true or false
        // create a binary result out of it, eg. 1011
        // NORTH
        if (tiles[gridX][gridY - 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // WEST
        if (tiles[gridX - 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // SOUTH
        if (tiles[gridX][gridY + 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // EAST
        if (tiles[gridX + 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }

        // convert binary string to a decimal values from 0 - 15
        let decimalResult = parseInt(binaryResult, 2);
        let posX = tileSize * gridX - tileSize / 2;
        let posY = tileSize * gridY - tileSize / 2;

        noStroke();
        tint(tileColors[gridX][gridY]);

        // decimalResult is also the index for the shape array
        image(
          modules[tileType[gridX][gridY]][decimalResult],
          posX,
          posY,
          tileSize,
          tileSize
        );

        if (isDebugMode) {
          fill(60);
          text(
            currentTile + "\n" + decimalResult + "\n" + binaryResult,
            posX,
            posY
          );
        }
      }
    }
  }

  graphic.updatePixels();
}

function drawText() {
  const size = 110;
  const textGap = 45;

  // graphic.push();
  // graphic.translate(width / 2, height / 2);
  graphic.fill("#000000");
  graphic.strokeWeight(4);
  graphic.textSize(size);
  graphic.textStyle(BOLD);
  graphic.textAlign(CENTER, CENTER);
  graphic.fill("#000000");
  graphic.text("MITSUYA", width / 4, 100 - textGap);
  graphic.text("BAUHAUS", width / 4, 100 + textGap);
  // graphic.pop();
  // image(graphic, 0, 0);
}

function initTiles() {
  for (let gridX = 0; gridX < gridResolutionX; gridX++) {
    tiles[gridX] = [];
    tileColors[gridX] = [];
    tileType[gridX] = [];
    for (let gridY = 0; gridY < gridResolutionY; gridY++) {
      tiles[gridX][gridY] = 0;
      tileColors[gridX][gridY] = color(random(360), 0, random(100));
    }
  }
}

function setTile() {
  // convert mouse position to grid coordinates
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
  tileColors[gridX][gridY] = activeTileColor;
  if (randomMode) {
    tileType[gridX][gridY] = moduleType[int(random(moduleType.length))];
  } else {
    tileType[gridX][gridY] = activeModuleSet;
  }
}

function unsetTile() {
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 0;
}

function drawGrid() {
  for (let gridX = 0; gridX < gridResolutionX; gridX++) {
    for (let gridY = 0; gridY < gridResolutionY; gridY++) {
      let posX = tileSize * gridX - tileSize / 2;
      let posY = tileSize * gridY - tileSize / 2;
      fill(360);
      if (isDebugMode) {
        if (tiles[gridX][gridY] == 1) fill(80);
      }
      stroke(0);
      rect(posX, posY, tileSize, tileSize);
    }
  }
}

function drawModules() {
  for (let gridX = 1; gridX < gridResolutionX - 1; gridX++) {
    for (let gridY = 1; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles
      let currentTile = tiles[gridX][gridY];
      if (tiles[gridX][gridY] != 0) {
        let binaryResult = "";
        // check the four neightbours, each can be true or false
        // create a binary result out of it, eg. 1011
        // NORTH
        if (tiles[gridX][gridY - 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // WEST
        if (tiles[gridX - 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // SOUTH
        if (tiles[gridX][gridY + 1] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }
        // EAST
        if (tiles[gridX + 1][gridY] != 0) {
          binaryResult += "1";
        } else {
          binaryResult += "0";
        }

        // convert binary string to a decimal values from 0 - 15
        let decimalResult = parseInt(binaryResult, 2);
        let posX = tileSize * gridX - tileSize / 2;
        let posY = tileSize * gridY - tileSize / 2;

        noStroke();
        tint(tileColors[gridX][gridY]);

        // decimalResult is also the index for the shape array
        image(
          // modules[tileType[gridX][gridY]][decimalResult],
          modules[tileType[gridX][gridY]][0],
          posX,
          posY,
          tileSize,
          tileSize
        );

        if (isDebugMode) {
          fill(60);
          text(
            currentTile + "\n" + decimalResult + "\n" + binaryResult,
            posX,
            posY
          );
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");

  if (keyCode == DELETE || keyCode == BACKSPACE) initTiles();
  if (key == "g" || key == "G") doDrawGrid = !doDrawGrid;
  if (key == "d" || key == "D") isDebugMode = !isDebugMode;
  if (key == "r" || key == "R") randomMode = !randomMode;

  if (key == "1") activeModuleSet = "A";
  if (key == "2") activeModuleSet = "B";
  if (key == "3") activeModuleSet = "C";
  if (key == "4") activeModuleSet = "D";
  if (key == "5") activeModuleSet = "E";
  if (key == "6") activeModuleSet = "F";
  if (key == "7") activeModuleSet = "J";
  if (key == "8") activeModuleSet = "K";

  if (key == "y" || key == "Y") activeTileColor = color(0);
  if (key == "x" || key == "X") activeTileColor = color(52, 100, 71);
  if (key == "c" || key == "C") activeTileColor = color(192, 100, 64);
  if (key == "v" || key == "V") activeTileColor = color(273, 73, 51);
  if (key == "b" || key == "B") activeTileColor = color(323, 100, 77);
}
