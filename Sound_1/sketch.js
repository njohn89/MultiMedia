var title = "Super Sampler";
var bleep;
var cb;
var hh;
var scifi;
var loop;
var sampler;
var player;
var crush;


function preload() {
  //We create both of the objects we need to lay sound files: a Buffers object to hold them soundfiles,
  // and another type of object to play those soundfiles.
  
  //Step 1: Make a simple Player here. You should NOT try to connect it to anything (either your effect or your
  //master speakers yet. This will happen later. You also won't need any arguments
  //or need to customize any properties here.
  
  audio = new Tone.Player() .toMaster();
  crush = new Tone.BitCrusher() .toMaster();
  delay = new Tone.FeedbackDelay() .toMaster();
  phaser = new Tone.Phaser() .toMaster();
  
  
  player = new Tone.Player().connect(crush);
  
  //Step 1a: Let's make a new Bufers object here!
  //what do we need to do to the line below in order to correctly
  //call for the creation of a new Buffers object?
	  samples = new Tone.Buffers({
		//Step 1b: We need to call for 4 different sound files
		//to be loaded into the sketch's buffers here.
		//Read the Tone.js API document on Buffers to learn how to do this step!
      "BD": "BD.wav",
      
	})
}

function setup() {
  createCanvas(600,400);
	background(200);

//Step 2: Once we have our soundfile player objects made, lets choose an audio effect
//and call for it to be created here! Research your chosen effect
//on the Tone.js API page and then set up the creation of your effect below:


	//Step 2b: Once you've chosen your effect, lets finish up
	  //by connecting our signal path! How do we connect our player to our effect?
	  // audio source will connect to whatever effect we choose to use.
	
  
	
	//Here are theButtons to change Effect Value 
	
	button = createButton ('Change #1');
	button.position(420, 40);
	button.mousePressed(effectValueChange)// Allow for effect value to change on button click
	
	button = createButton ('Change #2');
	button.position(220, 40);
	button.mousePressed(effectValueChange)// Allow for effect value to change on button click
	
	// Buttons to trigger samples
	button = createButton('1');
  button.position(20, 80);
  button.mousePressed(samp1);

	//button2 = createButton('2');
  //button2.position(50, 80);
  //button2.mousePressed(samp2);

	//button3 = createButton('3');
  //button3.position(80, 80);
  //button3.mousePressed(samp3);
//
	//button4 = createButton('4');
  //button4.position(110, 80);
  //button4.mousePressed(samp4);
}



function draw() {
  strokeJoin(ROUND);
  strokeWeight(3);
  fill(255);
  rect(0, 0,180, 60);
	fill(100, 200, 170); 
	text(title, 10, 20);
	text("Click buttons to change effect value!", 10, 50);
}


//Step 3: The following functions all need to do one thing:
//Each function needs to contain ONE line of code that triggers
//a sound sample from your buffers. Write the missing
//code inside of each function that will cause the corresponding
//numbered sample to play back (Example: samp1() should cause
//your first sample loaded in the buffers object to play.

//Research the buffers page on the Tone.js website to
//check your answer!

function samp1() {
	player.buffer = samples.get("bleep");
	player.start();
}
//function samp2() {
//	player.buffer = samples.get("cb");
//	player.start();
//}
//function samp3() {
//	player.buffer = samples.get("hh");
//	player.start();
//}
//function samp4() {
//	player.buffer = samples.get("scifi");
//	player.start();
//}


// Step 4: Now lets make it so that when we click on either of our effect 
//change buttons, that ONE of the parameters of your chosen effect changes.
//Choose one parameter of your chosen effect (Examples: delay time, distortion amount,
//phasor depth, etc.) and have it update to the values coded for you below
//when the buttons are pressed. All you need to do is add the missing code
//that calls for your effect's parameter and place it before ".value"
//Use the following guide words below and the Tone.js website for help!

function effectValueChange() {
	if(mouseX > 420){//This measures the left effect button
	  crush.bits =  8;//these are example values. You shuld change them based on which effect you choose!
	} else if (mouseX < 320){
	  crush.bits = 1;//these are example values. You shuld change them based on which effect you choose!
	}

}

