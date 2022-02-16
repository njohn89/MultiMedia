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
  image(walkUp[frame], this.xPosition, this.yPosition, 80, 80);

}





function Sprite(startX, startY, temp) {

  this.xPosition = startX; 
  this.yPosition = startY;
  this.lastPosition = 1;  // 1, 2, 3, 4 = right, down, left, up 
  this.sprite = temp;
  var walkUp = [];
  var walkDown = [];
  var walkRight = [];
  var walkLeft = [];
  



  this.load = function () {
    var spriteWidth = 80;
    walkDown =  this.sprite.get(spriteWidth, 400, 80, 80);
  }




  this.walk = function () {
    
  }
}

