/* 
 DDF 2019
 Creates a gradient made of random shapes
 need to have p5.svg.js in project and in index.html
 see -https://github.com/zenozeng/p5.js-svg
click mouse to export SVG
 */

var record = false;
function setup() {
  console.log('hallo')
  const initialCanvas = document.getElementById('canvas');
  const width = initialCanvas.clientWidth;
  const height = initialCanvas.clientHeight;

  const canvas = createCanvas(width, height, SVG); // Create SVG Canvas
  strokeWeight(1); // do 0.1 for laser
  stroke(255, 0, 0); // red is good for laser
  fill(0);
  frameRate(2); // better not to have a fill for laser

  initialCanvas.appendChild(canvas.elt.wrapper)
}

function draw() {
  background(255);
  for (var x = 0; x < width; x += 50) {
    for (var y = 0; y < height; y += 50) {
      var shapeSize = x / 10;
      if (random(2) < 1) {
        ellipse(x, y, shapeSize, shapeSize);
      } else {
        rect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
      }
    }
  }
  if (record == true) {
    console.log(save)
    save("mySVG.svg"); // give file name
    print("saved svg");
    record = false;
  }
}

function mousePressed() {
  record = true;
}