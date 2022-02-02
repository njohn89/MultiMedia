// Nicholas_Johnson
var paint_color;


function setup() {
  createCanvas(1600, 1600);
  strokeWeight(2);
  background(255)
  paint_color = color(50);
}

function draw() {
  if (mouseIsPressed) {
    if (mouseX <= 20) {
      if (mouseY <= 20) {
        paint_color = color(0, 0, 255);
      } else if (mouseY <= 40) {
        paint_color = color(66, 244, 194);
      } else if (mouseY <= 60) {
        paint_color = color(255, 0, 199);
      } else if (mouseY <= 80) {
        paint_color = color(249, 99, 0);
      } else if (mouseY <= 100) {
        paint_color = color(255, 22, 26);
      } else if (mouseY <= 120) {
        paint_color = color(242, 255, 0);
      } else if (mouseY <= 140) {
        paint_color = color(0, 137, 9);
      }
    }
    stroke(paint_color)
    line(mouseX, mouseY, pmouseX, pmouseY);
  }


  
  stroke(color(0));
  fill(0, 0, 255);
  rect(0, 0, 20, 20);
  fill(66, 244, 194);
  rect(0, 20, 20, 20);
  fill(255, 0, 199);
  rect(0, 40, 20, 20);
  fill(249, 99, 0);
  rect(0, 60, 20, 20)
  fill(255, 22, 26);
  rect(0, 80, 20, 20);
  fill(242, 255, 0);
  rect(0, 100, 20, 20);
  fill(0, 137, 9);
  rect(0, 120, 20, 20);

  print(paint_color)

}