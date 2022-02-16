//Nicholas Johnson
var snake;

var speed;
var snakeSprite;

var lastPosition // for resting direction

function preload() {
  snake = loadImage("monkeyRight.png");
}

function setup() {

  createCanvas(1600, 1000);
  frameRate(18);

  snakeSprite = new Sprite(5, 5, snake);
  snakeSprite.load();
  //snakeright
  

  


  //Speed
  speed = 10;



}

function draw() {
  background(255);
  //image(moveUp[frame], this.xPosition, this.yPosition, 80, 80);
  snakeSprite.move();

}





function Sprite(startX, startY, temp) {

  this.xPosition = startX; 
  this.yPosition = startY;
  this.lastPosition = 1;  // 1, 2, 3, 4 = right, down, left, up 
  this.sprite = temp;
  var moveUp = [];
  var moveDown = [];
  var moveRight = [];
  var moveLeft = [];
  



  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 5; i++) {
      moveRight[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
    }
  }




  this.move = function () {
    //this.xPosition = this.xPosition + speed;
    image(moveRight[0], this.xPosition, this.yPosition, 80, 80);
  }
}

