//Nicholas Johnson
var meat;
var spelunky;
var green;
var speed;
var meatcharacter;
var spulunkycharacter;
var greenSptite;
var lastPosition // for resting direction

function preload() {
  spelunky = loadImage("spelunky.png");
  green = loadImage("green.png");
  meat = loadImage("meat.png");


}

function setup() {

  createCanvas(1600, 1000);
  frameRate(18);

  meatcharacter = new character(5, 5, meat);
  spulunkycharacter = new character(200, 200, spelunky);
  greenSptite = new character(400, 20, green);

  meatcharacter.load();
  spulunkycharacter.load();
  greenSptite.load();


  //Speed
  speed = 10;



}

function draw() {
  background(255);

  if (keyIsPressed && keyCode == LEFT_ARROW) {
    scale(-1, 1);
    meatcharacter.walk();
    spulunkycharacter.walk();
    greenSptite.walk();

  } else if (keyIsPressed) {
    meatcharacter.walk();
    spulunkycharacter.walk();
    greenSptite.walk();


  } else if (lastPosition == 3) {
    scale(-1, 1);
    meatcharacter.walk();
    spulunkycharacter.walk();
    greenSptite.walk();
  } else {
    meatcharacter.walk();
    spulunkycharacter.walk();
    greenSptite.walk();
  }

}





function character(startX, startY, temp) {

  this.xPosition = startX; this.yPosition = startY;
  this.lastPosition = 1;  // 1, 2, 3, 4 = right, down, left, up 
  this.character = temp;
  var walkUp = [];
  var walkDown = [];
  var walkRight = [];
  var walkLeft = [];
  



  this.load = function () {
    var characterWidth = 80;
    for (i = 0; i < 6; i++) {
      walkUp[i] = this.character.get(i * characterWidth, 400, 80, 80);
      walkDown[i] = this.character.get(i * characterWidth + 480, 400, 80, 80);
    }
    for (i = 0; i < 8; i++) {
      walkRight[i] = this.character.get(i * characterWidth, 0, 80, 80);
      walkLeft[i] = this.character.get(i * characterWidth, 0, 80, 80);
      stumble[i] = this.character.get(i * characterWidth, 160, 80, 80);
    }
  }




  this.walk = function () {
    var frame = frameCount % 6;
    var frame2 = frameCount % 8;
    var frame3 = frameCount % 7;
    if (keyIsPressed == true) {
      if (keyCode == UP_ARROW) {
        lastPosition = 4;
        this.yPosition = this.yPosition - speed;
        image(walkUp[frame], this.xPosition, this.yPosition, 80, 80);
      } else if (keyCode == RIGHT_ARROW) {
        lastPosition = 1;
        this.xPosition = this.xPosition + speed;
        image(walkRight[frame2], this.xPosition, this.yPosition, 80, 80);
      } else if (keyCode == LEFT_ARROW) {
        lastPosition = 3;
        this.xPosition = this.xPosition - speed;
        image(walkLeft[frame3], -this.xPosition - 80, this.yPosition, 80, 80);
      } else if (keyCode == DOWN_ARROW) {
        lastPosition = 2;
        this.yPosition = this.yPosition + speed;
        image(walkDown[frame], this.xPosition, this.yPosition, 80, 80);
      }

    } else if (lastPosition == 1) {
      image(walkRight[0], this.xPosition, this.yPosition, 80, 80);
    } else if (lastPosition == 2) {
      image(walkDown[0], this.xPosition, this.yPosition, 80, 80);
    } else if (lastPosition == 3) {
      image(walkLeft[0], -this.xPosition - 80, this.yPosition, 80, 80);
    } else if (lastPosition == 4) {
      image(walkUp[0], this.xPosition, this.yPosition, 80, 80);
    } else {
      image(walkRight[0], this.xPosition, this.yPosition, 80, 80);
    }



  }





}