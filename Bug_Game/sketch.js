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

//Serial Communication
var cursorRect;
var serial;
var num;
var latestData = 'waiting for data'; // you'll use this to write incoming data to the canvas
const portName = 'COM3'; // fill in your serial port name here
var rectX = 200;
var rectY = 500;
var X;
var Y;
var strTest = 'X:20';
var parse;
var sw; 
var r = 0, g = 20, b = 20;
var hold = false;
var click = false;
var frameAtClick = 0;
var auxFrame;


var lastPosition // for resting direction

function preload() {
  monkey = loadImage("monkeyRight.png");
  monkeyDown = loadImage("down.png");

  
}

function setup() {

  paint = color(0, 0, 0);
	//console.log(strTest);
	//var newStr = strTest.replace( /[^\d.]/g, '' );
	//console.log(newStr);
	//parse = parseInt(newStr);
	//console.log(parse);
  createCanvas(windowHeight, windowHeight);
  
  serial = new p5.SerialPort();

	// Get a list the ports available
	// You should have a callback defined to see the results
	serial.list();

	// Assuming our Arduino is connected, let's open the connection to it
	// Change this to the name of your arduino's serial port
	serial.open(portName);

	// Here are the callbacks that you can register

	// When we connect to the underlying server
	serial.on('connected', serverConnected);

	// When we get a list of serial ports that are available
	serial.on('list', gotList);
	// OR
	//serial.onList(gotList);

	// When we some data from the serial port
	serial.on('data', gotData);
	// OR
	//serial.onData(gotData);

	// When or if we get an error
	serial.on('error', gotError);
	// OR
	//serial.onError(gotError);

	// When our serial port is opened and ready for read/write
	serial.on('open', gotOpen);
	// OR
	//serial.onOpen(gotOpen);

	// Callback to get the raw data, as it comes in for handling yourself
	//serial.on('rawdata', gotRawData);
	// OR
	//serial.onRawData(gotRawData);





  squashNoise = new Tone.Synth({
    oscillator: { type: "square" }
  }).toMaster()
  squashNoise.frequency.value = 200;

  const pingPong = new Tone.PingPongDelay("6n", 0.3).toMaster()
  const synth = new Tone.Synth().connect(pingPong);
  const seq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, ["C4", ["C3", "G4"], "G4", "", ["A4", "G4", "E4"], "G4"]).start(0);

Tone.Transport.start();
  

  canvasX = 1000;
  createCanvas(windowWidth, windowHeight);
  frameRate(18);
  
  for(i = 0; i<4; i++) right.push(new Sprite(-100 - random(750), (i * 100) +200 + random(150), monkey ));

  for(i = 0; i<4; i++) down.push(new BugDown((i*190) + 470, -275 - random(100), monkeyDown));
  

  for(i in right) right[i].load();
  for(i in down) down[i].load();
  
  //Speed
  speed = 4;


}

//
// We are connected and ready to go
function serverConnected() {
	print('Connected to Server');
}

// Got the list of ports
function gotList(thelist) {
	print('List of Serial Ports:');
	// theList is an array of their names
	for (var i = 0; i < thelist.length; i++) {
		// Display in the console
		print(i + ' ' + thelist[i]);
	}
}

// Connected to our serial device
function gotOpen() {
	print('Serial Port is Open');
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
	print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
	var currentString = serial.readLine(); // read the incoming string
	trim(currentString); // remove any trailing whitespace
	if (!currentString) return; // if the string is empty, do no more
	if(currentString.charAt(0) == 'X') X = parseInt(currentString.replace(/[A-Za-z$]/g, "")); 
	if(currentString.charAt(0) == 'Y') Y = parseInt(currentString.replace(/[A-Za-z$]/g, ""));
	if(currentString.charAt(0) == 'S') sw = parseInt(currentString.replace(/[A-Za-z$]/g, ""));

	//console.log(currentString); // println the string
	
  latestData = currentString; // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
	print('gotRawData' + thedata);
}
//


function draw() {
  

  if(frameCount == 1){
    Tone.Transport.start();
  }
  if(hold && frameCount % 3 == 0){
    if(sw){
      hold = false;
      click = false;
      console.log("RELEASE");
    }
  }  

  background(255, 255, 180);
  
  textAlign(RIGHT, TOP);
  textSize(20);
  text(timer, canvasX - 50, 50);
  if(frameCount % 18 == 0 && timer > 0) timer--;

  if(X){
    rectX += (12*X);
  }
  if(Y){
    rectY += (12*Y);
  }
  if(!sw && frameCount - frameAtClick > 9 && !hold){
    
    console.log("CLICK");
    frameAtClick = frameCount;
    hold = true;
    click = true;
    


  }

  cursorRect = rect(rectX, rectY, 9, 9);
  cursorRect.fill("black")



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
function Attack(){
  console.log("ATTACK");
}


//move right class
function Sprite(startX, startY, temp) {
  this.speed = random(2, 4);
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
    if(click) {
      
      cick = false;
      if(frameAtClick - frameCount == 0) squashNoise.triggerAttackRelease(170, 0.05);
      //console.log("Delat YEst");
      if(rectX+3 <= this.xPosition+90 && rectX+3 >= this.xPosition){
        if(rectY+3 <= this.yPosition+90 && rectY+3 >= this.yPosition){
          
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

      if(click) {
      
        cick = false;
        if(frameAtClick - frameCount == 0) squashNoise.triggerAttackRelease(170, 0.05);
        //console.log("Delat YEst");
        if(rectX+3 <= this.xPosition+90 && rectX+3 >= this.xPosition){
          if(rectY+3 <= this.yPosition+90 && rectY+3 >= this.yPosition){
            
            image(squash[0], this.xPosition, this.yPosition, 80, 80);
            this.squashDelay++;
            this.dead = true;
            totalDead++;
            
            
  
          }
        }
      }

}}}
