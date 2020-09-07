let graphic;

function setup() {
  createCanvas(600, 600);
  // colorMode(HSB, 360, 100, 100, 100);
  background(255, 0, 0);

  graphic = createGraphics(width, height);

  noLoop();
  for (let i = 0; i < 400; i++) {
    // drawLine();

    fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), random(50));
  }

  // fill(0);

  drawText();
}

function drawText() {
  // createGraphicsの背景色を赤に設定し赤い四角を描画
  graphic.background(150, 0, 0);
  // 円形に取り除く
  graphic.erase();

  graphic.textSize(100);
  graphic.textStyle(BOLD);
  graphic.fill(0, 0, 50);
  graphic.textAlign(CENTER, CENTER);
  graphic.text("MITSUYA", width / 2, height / 2 - 50);
  graphic.text("BAUHAUS", width / 2, height / 2 + 50);
  graphic.noErase();

  // pgをimageとして配置
  image(graphic, 0, 0);
}
