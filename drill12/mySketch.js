let canvas, ctx, wave, theta;

window.onload = () => {
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d");

  wave = {
    y: window.innerHeight / 2,
    length: 200000,
    amplitude: 80,
    speed: 0.05,
  };

  theta = 0;
  window.requestAnimationFrame(animation);
};

function animation(timestamp) {
  window.requestAnimationFrame(animation);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, window.innerHeight / 2);
  ctx.strokeStyle = `rgb(0, 0, 0)`;
  ctx.lineWidth = 1;

  // NOTE: Left waves
  for (let i = 0; i < window.innerWidth / 2; i++) {
    ctx.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + theta) * wave.amplitude * Math.sin(theta)
    );
  }

  ctx.stroke();

  // NOTE: Right waves
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);

  for (let i = window.innerWidth / 2; i < window.innerWidth; i++) {
    ctx.lineTo(i, wave.y + Math.sin(i * wave.length + theta) * wave.amplitude);
  }
  ctx.stroke();

  theta += wave.speed;
}
