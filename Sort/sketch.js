var winH;
var winW

function setup() {
  winH = $(window).height();
  winW = $(window).width();
  createCanvas(winW-100, winH-100);
  strokeWeight(1);
  //background(255);
  
  //console.log(winH);
  //paint_color = color(0,0,0);
}
function draw() {
  //createCanvas(winW-100, winH-100);
  dropOne = new Drop(10, 10);

  //for(i = 0; i<10; i++) {
  //  dropOne.fall();
  //}
  
  //stroke("red");
  //strokeWeight(0.0125);
  //line(100, 100, 20, 20);
}


function Drop(xPos, yPos){
  this.x = xPos;
  this.y = yPos;
  this.size = 10;
  stroke("red");
  this.thisLine = line(this.x, this.y, this.x+10, this.y+10);

  this.fall = function() {
    //console.log("&&");
    
    
    while(this.x < winH) {
      console.log("&&");
      line(this.x, this.y, this.x+10, this.y+10);

    }

  }

}


