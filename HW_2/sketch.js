//Nicholas Johnson

var paint_color;


function setup() {
  createCanvas(1600, 1600);
  strokeWeight(2);
  background(255);
  paint_color = color(0,0,0);
}



function draw() {
  let r = color(255,0,0);
  let o = color(255,160,96);
  let y = color(255,224,32);
  let g = color(0,192,0);
  let c = color(0,255,255);
  let bl = color(0,32,255);
  let m= color('magenta');
  let br = color(150,75,0);
  let w = color(255,255,255);
  let blk = color(0,0,0);
  if (mouseIsPressed) {
    if (mouseX <= 20) {
      if (mouseY <= 20) {
        paint_color = r;
      } else if (mouseY <= 40) {
        paint_color = o;
      } else if (mouseY <= 60) {
        paint_color = y;
      } else if (mouseY <= 80) {
        paint_color = g;
      } else if (mouseY <= 100) {
        paint_color = c;
      } else if (mouseY <= 120) {
        paint_color = bl;
      } else if (mouseY <= 140) {
        paint_color = m;
	    } else if (mouseY <= 160) {
	      paint_color = br;
      } else if (mouseY <= 180) {
	      paint_color = w;
      } else if (mouseY <= 200) {
	      paint_color = blk;
	    }
    } 
      
      
        stroke(paint_color);
        line(mouseX, mouseY, pmouseX, pmouseY);
        

  }

	  
  
    
  


  
  stroke(color(0));
  fill('red');
  rect(0, 0, 20, 20);
  fill(255,160,96);
  rect(0, 20, 20, 20);
  fill(255,224,32);
  rect(0, 40, 20, 20);
  fill(0,192,0);
  rect(0, 60, 20, 20)
  fill(0,255,255);
  rect(0, 80, 20, 20);
  fill(0,32,255);
  rect(0, 100, 20, 20);
  fill('mageneta');
  rect(0, 120, 20, 20);
  fill(150,75,0);
  rect(0, 120, 20, 20);
  fill(0,0,0);
  rect(0, 120, 20, 20);
  //print(paint_color);
}
