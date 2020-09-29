export default class Oscillator {
  
  // Because we are going to oscillate along the x and y axis we can use PVector for two angles, amplitudes, etc.!
  
  constructor(r) {
    
    // Initialize randomly
    this.theta = 0;
    this.amplitude = r;
    
  }

  // Update theta and offset
  update(thetaVel) {
    this.theta += thetaVel;
  }

  // Display based on a position
  display(pos) {
    const x = map(cos(this.theta),-1,1,0,this.amplitude);
    
    stroke(0);
    fill(50);
    line(0,0,x,0);
    ellipse(x,0,8,8);
  }
}