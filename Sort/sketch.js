var winH;
var winW

function setup() {
  winH = $(window).height();
  winW = $(window).width();
  createCanvas(winW-100, winH-100);
  strokeWeight(1);
  dropOne = new Drop(10, 10);
  //background(255);
  
  //console.log(winH);
  //paint_color = color(0,0,0);
}
function draw() {
  //createCanvas(winW-100, winH-100);
  
  dropOne.fall();

  
  
  //stroke("red");
  //strokeWeight(0.0125);
  //line(100, 100, 20, 20);
}


function Drop(xPos, yPos){
  this.fallSpeed = 10.00;
  this.x = xPos;
  this.y = yPos;
  this.size = 10;
  stroke("purple");
  this.thisLine = line(this.x, this.y, this.x+10, this.y+10);

  this.fall = function() {
    //console.log("&&");
    
    
    if(this.y < winH) {
      //console.log("&&");
      
      
      
      line(this.x, this.y, this.x+10, this.y+10);
      this.y = this.y + this.fallSpeed;
      this.fallSpeed = this.fallSpeed + 0.5;

    }

  }

}


