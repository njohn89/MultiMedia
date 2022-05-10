//Nicholas Johnson



//Tone.js 
var filterFreq = 900;
var filterOne;
var seq;
var switchCount = 0;
var part;
var pingPong;
var feedbackDelay
var swLock = true;

//Serial Communication
var cursorRect;
var serial;
var num;
var latestData = 'waiting for data'; // you'll use this to write incoming data to the canvas
const portName = 'COM3'; // fill in your serial port name here
var rectX = 900;
var rectY = 450;
var recR = 255;
var recG = 255;
//recB = 180
var recB = 100;
var switchDirection = 1;
//let recColor = color(255, 255, 180);


var X;
var Y;
var B;
var buttonLatch = false;
var strTest = 'X:20';
var parse;
var sw; 

var hold = false;
var click = false;
var frameAtClick = 0;
var auxFrame;
var lastX = rectX;
var lastY = rectY;


var lastPosition // for resting direction

function preload() {
  bckgrnd = loadImage("Lowered-Sunset.jpg");
  mega = loadImage("mgga.png");
  

  
}

function setup() {
    createCanvas(1800, 900);
    

    paint = color(0, 0, 0);
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
    pingPong = new Tone.PingPongDelay("3n", 0.2).toMaster()
    filterOne = new Tone.Filter(filterFreq, "lowpass").connect(pingPong);
    const synth = new Tone.PolySynth().connect(filterOne);
    
    feedbackDelay = new Tone.FeedbackDelay("4n", 0.2).toMaster();
    //const square = new Tone.Synth({ oscillator: { type: "square" }}).connect(filter);

    const plucky = new Tone.PluckSynth({
        attackNoise: 2
    }).connect(feedbackDelay);
    
    part = new Tone.Part(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        plucky.triggerAttackRelease(note, "8n", time);
    }), [[0, "A2"], ["0:2", "D2"], ["0:4", "B2"]]).start(3);
    //Tone.Transport.start();

    //part.loop = 8;






    seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.12, time);
// subdivisions are given as subarrays
}, [["A4", "G#4", "C#4"], "E3",["D4", "C#4", "F#4"], ["A4", "G#4","C#4"],["D4", "C#4", "F#4"]]).start(0);
    //seq.playbackRate = 0.9;

    //Tone.Transport.start();
    console.log(plucky.attackNoise);
    


}
	
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
        if(currentString.charAt(0) == 'B') B = parseInt(currentString.replace(/[A-Za-z$]/g, "")); 
    
        //console.log(currentString); // println the string
        
      latestData = currentString; // save it for the draw method
    }
    
    // We got raw from the serial port
    function gotRawData(thedata) {
        print('gotRawData' + thedata);
    }
    //

    function snake(){

    }
  
    function draw() {
        let currentTime = pingPong.delayTime.value;
        if(frameCount == 10) swLock = false;

        if(swLock && frameCount % 40 == 0 && frameCount - frameAtClick > 20){swLock = false;}
        //255, 255, 180
        
        background(bckgrnd);
        cursorRect = rect(rectX, rectY, 5, 5);
        cursorRect.fill(recR, recG, recB);

        if(frameCount % 180 == 0){
            console.log("delayTime", pingPong.delayTime.value);
            console.log("seq -> ", seq.loopStart, seq.loopEnd);
            console.log("part -> ", part.loopStart, part.loopEnd);
            console.log("Butt -> ", B);
            //console.log("Dir ->", switchDirection);
            //console.log("SW_LOCK -> ", swLock);
            //console.log("Y -> ", rectY);
        }

        if(X){
            if(!( (X==-1 && rectX <= 3) || (X==1 && rectX >= 1790) )){            
                rectX += (6*X);
                filterFreq += 6*X;
            }
        }
        if(Y){
            if(!( (Y==-1 && rectY <= 3) || (Y==1 && rectY >= 890) )){
                rectY += (6*Y);
                if(rectY < 700 && rectY > 200){
                    seq.playbackRate += (0.01*Y);
                    //pingPong.set({delayTime: currentTime + (.01*Y)});
                }
            }
        }
        if(!sw && !swLock){
            swLock = true;
            console.log("Click At frame -> ", frameCount);
            switchCount++;
            frameAtClick = frameCount;

            recR -= 200*switchDirection;
            recG -= 40*switchDirection;
            recB += 20*switchDirection;

            

            if(switchDirection > 0){
                Tone.Transport.start();
            }
            else{
                Tone.Transport.stop();
            }


            switchDirection *= -1;

            //part.start(0);
            //swLock = true;


        }


        filterOne.set({

            frequency: filterFreq,
            
        });

        

        //let testA = rect(0,0, 200, 200);
        //testA.fill(201, 220, 195)
        

    }
  



