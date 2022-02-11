var winH;
var winW

function setup() {
  winH = $(window).height();
  winW = $(window).width();
  createCanvas(winW-100, winH-100);
  strokeWeight(2);
  background(255);
  
  console.log(winH);
  paint_color = color(0,0,0);
}



function draw() {
  //createCanvas(winW-100, winH-100);
  
  rect(0,winH-100, 250, 100);
  fill("red");
}
