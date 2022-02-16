//Nicholas Johnson
var monkey;

var speed;
var monkeySprite;
var right = [];
var down = [];


var lastPosition // for resting direction

function preload() {
  monkey = loadImage("monkeyRight.png");
  monkeyDown = loadImage("down.png");

  
}

function setup() {

  createCanvas(1600, 1000);
  frameRate(18);

  for(i = 0; i<5; i++){
    right.push(new Sprite(-100 - i*250 - random(100), (i * 100), monkey ));
  }

  for(i in right){
    right[i].load();
  }

  monkeySprite = new Sprite(0, 300, monkey);
  //monkeySprite2 = new Sprite(0, 100, monkey);
  //monkeySprite3 = new Sprite(0, 600, monkey);

  
  //monkeyDown = new BugDown(25, 0, monkeyDown);

  monkeySprite.load();
  //monkeySprite2.load();
  //monkeySprite3.load();

  //monkeyDown.load();

  //monkeyright
  

  


  //Speed
  speed = 10;



}

function draw() {
  background(255);
  //image(moveUp[frame], this.xPosition, this.yPosition, 80, 80);
  //monkeySprite.move();
  //monkeySprite2.move();
  //monkeySprite3.move();
  //monkeyDown.move();

  //console.log(right[0].xPosition);
  //right[4].test();
  for(i in right){
    right[i].move();
  }
  //monkeySprite.test();
  

}




//move right class
function Sprite(startX, startY, temp) {
  this.speed = random(6, 12);
  this.xPosition = startX; 
  this.yPosition = startY;
  this.lastPosition = 1;  // 1, 2, 3, 4 = right, down, left, up 
  this.sprite = temp;

  var moveRight = [];

  this.test = function () {
    for(i = 0; i<6; i++)
    image(moveRight[i], 310 + i*100, 100, 80, 80);

  }
  
  



  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 6; i++) {
      moveRight[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
      //moveDown[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
    }
  }



   /// move right across screen
  this.move = function () {    
    if (this.xPosition < 1600){
      this.xPosition = this.xPosition + this.speed;
      image(moveRight[frameCount % 6], this.xPosition, this.yPosition, 80, 80);
    }
  }

       
    
   
}


function BugDown(startX, startY, temp) {
  this.xPosition = startX; 
  this.yPosition = startY;
  var moveDown = [];
  this.sprite = temp;

  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 5; i++) {
      moveDown[i] = this.sprite.get(160, i*80, 80, 80);
      //moveDown[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
    }
  }

  //
  this.move = function () {     
    
    if (this.yPosition < 1000){
     this.yPosition = this.yPosition + speed; 
     image(moveDown[frameCount % 5], this.xPosition, this.yPosition, 80, 80);
    }
   }

}


