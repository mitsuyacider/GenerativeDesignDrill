'use strict'

let crawlers = []
let a
import Attractor001 from './Attractor001.js'
import Crawlers from './Crawlers.js'
const preload = () => {

}
function setup() {
  createCanvas(640, 360)
  for (let i = 0; i < 6; i++) {
    crawlers.push(new Crawlers())
  }

  a = new Attractor001(createVector(width / 2, height / 2), 20, 0.4)
}

function draw() {
  background(255)
  a.setRollover(mouseX, mouseY)
  a.go()
  
  for(let i = 0; i < crawlers.length; i++){
    const f = a.attract(crawlers[i])
    crawlers[i].applyForce(f)
    crawlers[i].update()
    crawlers[i].display()
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
