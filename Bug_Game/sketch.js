//Nicholas Johnson
var snake;
var spelunky;
var green;
var speed;
var snakeSprite;
var spelunkySprite;
var greenSptite;
var lastPosition // for resting direction

function preload() {
  snake = loadImage("snake.png");
}

function setup() {

  createCanvas(1600, 1000);
  frameRate(18);

  snakeSpriteDown = new Sprite(5, 5, snake);
  

  


  //Speed
  speed = 10;



}

function draw() {
  background(255);
  image(moveUp[frame], this.xPosition, this.yPosition, 80, 80);

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
    moveDown =  this.sprite.get(spriteWidth, 400, 80, 80);
  }




  this.move = function () {
    
  }
}

