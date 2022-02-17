//Nicholas Johnson
var monkey;
var canvasX;
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

  canvasX = 1000;
  createCanvas(canvasX, 750);
  frameRate(18);
  
  for(i = 0; i<4; i++) right.push(new Sprite(-100 - random(750), (i * 100) +200 + random(150), monkey ));

  for(i = 0; i<4; i++) down.push(new BugDown((i*190) + 470, -275 - random(1000), monkeyDown));
  

  for(i in right) right[i].load();
  for(i in down) down[i].load();
  

  //monkeySprite = new Sprite(0, 300, monkey);
  //monkeySprite2 = new Sprite(0, 100, monkey);
  //monkeySprite3 = new Sprite(0, 600, monkey);

  
  //monkeyDown = new BugDown(25, 0, monkeyDown);

  //monkeySprite.load();
  //monkeySprite2.load();
  //monkeySprite3.load();

  //monkeyDown.load();

  //monkeyright
  

  


  //Speed
  speed = 10;



}

function draw() {
  background(255);
  
  //right[1].test();
  for(i in right) right[i].move();
  //for(i in down) down[i].move();
  //monkeySprite.test();
  //down[0].test();
  

}




//move right class
function Sprite(startX, startY, temp) {
  this.speed = random(6, 12);
  this.xPosition = startX; 
  this.yPosition = startY;
  this.lastPosition = 1;  // 1, 2, 3, 4 = right, down, left, up 
  this.sprite = temp;
  this.dead = false;
  this.squashDelay = 0;

  var moveRight = [];
  var squash = [];

  this.test = function () {
    for(i = 0; i<6; i++)
    //image(moveRight[i], 310 + i*100, 100, 80, 80);
    image(squash[1], 310 + i*100, 100, 80, 80);
  }
  
  



  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 6; i++) {
      moveRight[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
      //moveDown[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
    }
    squash.push(this.sprite.get(5*spriteWidth, 80, 80, 80));
    squash.push(this.sprite.get(5*spriteWidth, 160, 80, 80))

  }



   /// move right across screen
  this.move = function () {
    
    if(this.dead){
      if(this.squashDelay <= 2){
        image(squash[0], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
        return;
      }
      if(this.squashDelay > 2){
        image(squash[1], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
        return;
      }
      if(this.squashDelay > 4){
        this.squashDelay = 0;
        this.xPosition = -250 - random(450);
        this.yPosition = this.yPosition + random(-50, 50);
        this.dead = false;
        return;
      }
     }
     
    if (this.xPosition < canvasX){
      this.xPosition = this.xPosition + this.speed;
      image(moveRight[frameCount % 6], this.xPosition, this.yPosition, 80, 80);
    }
    else {
      this.xPosition = -500 -  random(500);
      this.yPosition = this.yPosition + random(-80, 80);
      this.speed = this.speed + random(-1, 1);
    }
    if(mouseIsPressed){
      if(mouseX <= this.xPosition + 83 && mouseX >= this.xPosition){
        if(mouseY <= this.yPosition +83 && mouseY >= this.xPosition){
          image(squash[0], this.xPosition, this.yPosition, 80, 80);
          this.squashDelay++;
          this.dead = true;

        }
      }
    }
  }
  

       
    
   
}



function BugDown(startX, startY, temp) {
  this.xPosition = startX; 
  this.yPosition = startY;
  var moveDown = [];
  this.sprite = temp;
  var squash  = []

  this.test = function () {
    
    //image(moveRight[i], 310 + i*100, 100, 80, 80);
    image(squash[1], 310 + i*100, 100, 80, 80);
  }


   

  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 5; i++) {
      moveDown[i] = this.sprite.get(160, i*80, 80, 80);
    }
    squash.push(this.sprite.get(80, 5*80, 80, 80));
    squash.push(this.sprite.get(0, 8*80, 80, 80));
  }

  //
  this.move = function () {     
    
    if (this.yPosition < 1000){
     this.yPosition = this.yPosition + speed; 
     image(moveDown[frameCount % 5], this.xPosition, this.yPosition, 80, 80);
    }
   }

}


