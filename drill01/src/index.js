import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import './style.scss';

import Particles from './js/particles/Particles.js'

window.onload = function () {

  // NOTE: Set canvas size.
  //       This size is set in css. See style.scss.
  const initialCanvas = document.getElementById('canvas');
  const width = initialCanvas.clientWidth;
  const height = initialCanvas.clientHeight;

  const sketch = (p5) => {
    // make library globally available
    window.p5 = p5;
  
    let particles = {}
    let img = {};
    p5.preload = () => {
      console.log('preload')
      img = p5.loadImage('./assets/2020.png');
    }
    p5.setup = () => {
      const canvas = p5.createCanvas(width, height)
      const context = canvas.elt.getContext('2d');
      
      // NOTE: Fit p5 canvas with parent container. 
      //       Now p5 canvas will be set as fullscreen inside parent.
      canvas.parent('canvas');
      console.log('hallo')
      // NOTE: Image Setting
      p5.imageMode(p5.CENTER);
      p5.fill(255, 255, 0)
      p5.stroke(255, 0, 0)
      for (let y = 0; y < img.height; y += 10) {
        for (let x = 0; x < img.width; x += 10) {
          const c = img.get(x, y);
          p5.stroke(c)
          p5.ellipse(x, y, 5, 5);
        }
      }
    }
  
    // p5.draw = () => {
    //   p5.background(255);
    //   // console.log(img.width)
    //   p5.image(img, p5.width / 2, p5.height / 2);
    // }
  }
  
  new p5(sketch);
}