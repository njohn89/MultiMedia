//Nicholas Johnson
var monkey;
var canvasX;
var speed;
var monkeySprite;
var right = [];
var down = [];
var totalDead = 0;
var timer = 30;
var squashNoise;


var lastPosition // for resting direction

function preload() {
  monkey = loadImage("monkeyRight.png");
  monkeyDown = loadImage("down.png");

  
}

function setup() {


  squashNoise = new Tone.Synth({
    oscillator: { type: "square" }
  }).toMaster()
  squashNoise.frequency.value = 200;

  const pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster()
  const synth = new Tone.Synth().connect(pingPong);
  const seq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, ["C4", ["C3", "G4"], "G4", ["A4", "G4", "E4"], "G4"]).start(0);

//Tone.Transport.start();
  

  canvasX = 1000;
  createCanvas(canvasX, 750);
  frameRate(18);
  
  for(i = 0; i<4; i++) right.push(new Sprite(-100 - random(750), (i * 100) +200 + random(150), monkey ));

  for(i = 0; i<4; i++) down.push(new BugDown((i*190) + 470, -275 - random(100), monkeyDown));
  

  for(i in right) right[i].load();
  for(i in down) down[i].load();
  
  //Speed
  speed = 10;



}

function draw() {
  if(frameCount == 1){
    //Tone.Transport.start();
  }  

  background(255);
  
  textAlign(RIGHT, TOP);
  textSize(20);
  text(timer, canvasX - 50, 50);
  if(frameCount % 18 == 0 && timer > 0) timer--;

  textAlign(LEFT, TOP);
  textSize(20);
  text(totalDead, 50, 50);

  if(timer == 0){
    
    stroke(color(0));
    fill('red');
    rect(250, 250, 700, 700);

    noLoop();
    return;

  }
  
  //right[1].test();
  for(i in right) right[i].move();
  for(i in down) down[i].move();
  //monkeySprite.test();
  //down[0].test();
  

}

function Timer(){
  this.start = 30;
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
    image(squash[1], 310 + i*100, 100, 80, 80);
  }
  
  
  this.load = function () {
    var spriteWidth = 80;
    
    for (i = 0; i < 6; i++) {
      moveRight[i] = this.sprite.get(i * spriteWidth, 0, 80, 80);
    }
    squash.push(this.sprite.get(5*spriteWidth, 80, 80, 80));
    squash.push(this.sprite.get(5*spriteWidth, 160, 80, 80))

  }

   /// move right across screen
  this.move = function () {

    if(this.dead){
      if(this.squashDelay <= 4){
        
        image(squash[0], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
      }
      if(this.squashDelay > 4){
        image(squash[1], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
        
      }
      if(this.squashDelay > 7){
        this.squashDelay = 0;
        this.speed = this.speed + random(1, 5);
        this.xPosition = -250 - random(450);
        this.yPosition = this.yPosition + random(-50, 50);
        this.dead = false;

      }
      return;

     }

    else {
     
    if (this.xPosition < canvasX){
      this.xPosition = this.xPosition + this.speed;
      image(moveRight[frameCount % 6], this.xPosition, this.yPosition, 80, 80);
    }
    else {
      this.xPosition = -500 -  random(500);
      this.yPosition = this.yPosition + random(-80, 80);
      this.speed = this.speed + random(-1, 1);
    }
    if(mouseIsPressed) {
      squashNoise.triggerAttackRelease(190, 0.06);
      if(mouseX <= this.xPosition+90 && mouseX >= this.xPosition){
        if(mouseY <= this.yPosition+90 && mouseY >= this.yPosition){
          
          image(squash[0], this.xPosition, this.yPosition, 80, 80);
          this.squashDelay++;
          this.dead = true;
          totalDead++;
          
          

        }
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
  squash  = [];
  this.squashDelay = 0;
  this.dead=false;

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

    if(this.dead){
      if(this.squashDelay <= 4){
        image(squash[0], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
      }

      if(this.squashDelay > 4){
        image(squash[1], this.xPosition, this.yPosition, 80, 80);
        this.squashDelay++;
      }

      if(this.squashDelay > 7){
        this.squashDelay = 0;
        this.xPosition = -250 - random(450);
        this.yPosition = this.yPosition + random(-50, 50);
      }

      return;
    }

    else {

     if (this.yPosition < 1000){
        this.yPosition = this.yPosition + speed; 
        image(moveDown[frameCount % 5], this.xPosition, this.yPosition, 80, 80);
      }

      else{
        this.yPosition = -300 - random(400);
      }

      if(mouseIsPressed) {
        if(mouseX <= this.xPosition + 83 && mouseX >= this.xPosition){
          if(mouseY <= this.yPosition +83 && mouseY >= this.yPosition){
            image(squash[0], this.xPosition, this.yPosition, 80, 80);
            this.squashDelay++;
            this.dead = true;
            totalDead++
   }
   }

}}}}
