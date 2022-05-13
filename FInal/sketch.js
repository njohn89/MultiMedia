//Nicholas Johnson



//Tone.js 
var plucky;
var synth;
var fmSynth;
var membrane;
var mem2;

var filterFreq = 900;
var filterOne;
var filterTwo;
var filter3;
var seq;
var switchCount = 0;
var partP;
var partPoly;
var fmPart2;
var memPart;
var seqProgress

var ledToggle = false;


var pingPong;
var pShift;
var lowFreqO;
var feedbackDelay;
var swLock = true;
//221 + 160 + 221
//221,160,221
//Serial Communication
var cursorRect;
var topL;
var serial;
var num;
var latestData = 'waiting for data'; // you'll use this to write incoming data to the canvas
const portName = 'COM3'; // fill in your serial port name here
var rectX = 900;
var rectY = 450;
var recR = 255;
var recG = 255;

var backR = 221
var backG = 160;
var backB = 221;
//recB = 180
var recB = 100;
var switchDirection = 1;
var fadeDarker = false;
var fadeYellow = false;

//let recColor = color(255, 255, 180);


var X;
var Y;
var B;
var buttonLatch = false;
var buttonFrame = 0;
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
    //background(221,160,221);
    

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


    ////////////////////////
    //Tone.js setup////////
    ////////////////////////
    Tone.Transport.bpm.value = 90;

    crusher = new Tone.BitCrusher({
        bits: 8,
        wet: .5
    }).toMaster();

    verb = new Tone.Freeverb().toMaster();


    pingPong = new Tone.PingPongDelay("0:0:5", 0.2).toMaster();
    pShift = new Tone.PitchShift().toMaster;
    filterOne = new Tone.Filter(filterFreq, "lowpass").toMaster();
    filterTwo = new Tone.Filter({
        frequency: 690, 
        type: "bandpass",
        Q: 4,
        gain: .1,
        envelope:{
            decay:.09,
        }
    }).toMaster();

    filter3 = new Tone.Filter( 400, "bandpass" ).toMaster();
    
    synth = new Tone.PolySynth().connect(filterOne);
    
    feedbackDelay = new Tone.FeedbackDelay("4n", 0.2).toMaster();
    //const square = new Tone.Synth({ oscillator: { type: "square" }}).connect(filter);
    lowFreqO = new Tone.LFO({
        frequency: 2
    });


    fmSynth = new Tone.FMSynth({
        envelope: {attack: 0.001, decay: 0.7, sustain: 0}
    }).connect(filterOne);
    //lowFreqO.connect(fmSynth.frequency);
    
    plucky = new Tone.PluckSynth({
        attackNoise: 2
    }).toMaster();
    


    membrane = new Tone.MembraneSynth().toMaster();
    mem2 = new Tone.MembraneSynth().connect(filter3);
    //synth.triggerAttackRelease("C2", "8n");
    
    partP = new Tone.Part(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        plucky.triggerAttackRelease(note, "8n", time);
    }), [[0, "A2"], ["0:2", "D2"], ["0:4", "B2"]]);

    partPoly = new Tone.Part(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        synth.triggerAttackRelease(note, "8n", time);
    }), [[0, "A3"], ["0:2", "D3"], ["0:0:6", "B3"]]);
    partPoly.playbackRate = 2;

    //synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");

    memPart = new Tone.Part(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument

        membrane.triggerAttackRelease(note, "8n", time);
    }), [[ 0, "G1"], ["0:2", "C2"] ]);


    
    
    memPart.loop =  true;
    

    partP.loop = true;

    






    seq = new Tone.Sequence(((time, note) => {
        toggle();

        fmSynth.triggerAttackRelease(note, 0.09, time);
    
}), [["A4", "G#4", "C#4"], ["D4", "C#4", "F#4"], ["A4", "G#4","C#4"],["D4", "C#4", "F#4" ]]).start(0);
    seq.playbackRate = 0.5;

        //harmonicity : 3
    fmPart2 = new Tone.Sequence(((time, note) => {
        //fmSynth.frequency.value += 100;
        //fmSynth.detune += 2 * -(frameCount%3);
        fmSynth.triggerAttackRelease(note, "0:0:3", time);
        // subdivisions are given as subarrays
    }), [["A4", "G#4"], ["D4", "C#4",], "A4", "G#4","C#4", ["C#4", "F#4" ]]);
        seq.playbackRate = 0.5;

    

    memPart2 = new Tone.Sequence(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        toggle();
        mem2.triggerAttackRelease(note, "0:1", time);
    }), ["A2", "A2", "A2", "A2" ]);

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

    function toggle(){
        if(ledToggle){
            serial.write(1);
        }
        else {
            serial.write(0);
        }
        ledToggle = !ledToggle;

    }
  
    function draw() {
        // if(memPart.progress == 0){
        //     toggle();
        //     //serial.write(1);
        // }
        // else{
        //     //serial.write(0);
        // }
        background(backR,backG,backB);
        stroke(45, 100);

        textAlign(RIGHT, TOP);
        textSize(20);
        text(switchCount, 1800 - 50, 50);


        //Sequence Bars//
        //fm
        fill(255, 255, 200, 200);
        rect(0,0, 1800*seq.progress, 27);
        //Membrane
        fill(201, 120, 201, 200);
        rect(0, 870, 1800*memPart.progress, 27);
        //Plucky
        fill(180, 100, 190);
        rect(0, 450, 1800*partP.progress, 97, 0, 5, 5 );
        //Polly
        //fill("black");
       // rect(0, 269 , 1800*partPoly.progress, 120);


        //Cursor
        fill(recR, recG, recB);
        rect(rectX, rectY, 9, 9);
        fill(190, frameCount % 130 ,200);
        rect(1750, 75, 15, 15, 12, 12, 12);
    


        
        
        let currentTime = pingPong.delayTime.value;
        
        
        if(frameCount == 10) swLock = false;

        if(swLock && frameCount % 40 == 0 && frameCount - frameAtClick > 20){swLock = false;}
        //255, 255, 180 -> yellow
        // 221,160,221 -> purp
        
        
        
        

        

        if(frameCount % 230 == 0){
            
        }

        if(fadeDarker){
            if(backR+backG+backB > 275){

                backR -= (frameCount % 2);
                backG -= ((frameCount+1) % 2);
                backB -= ((frameCount+2) % 2);
            }
            else{
                console.log(backG, ", ", backG, ", ", backB);
            }
        }
        else if(fadeYellow && backR+backG+backB < 685 &&frameCount%3 == 0){
            //255 + 255 + 180
            //255, 255, 180 -> yellow
            //51 ,  51 ,  112 -> purp
            backR += 1;
            backG += 1;
            backB += 1;
            
        } 
            
         
        

        if(X){
            if(!( (X==-1 && rectX <= 3) || (X==1 && rectX >= 1790) )){            
                rectX += (6*X);
                filterFreq += 6*X;
                //filterTwo.frequency.value += 0.5*X;
            }
        }
        if(Y){
            if(!( (Y==-1 && rectY <= 3) || (Y==1 && rectY >= 890) )){
                rectY += (6*Y);
                filterTwo.Q.value +- Y*-.1;
                //filterTwo.frequency.value += 0.5*-Y;
                // if(rectY < 800 && rectY > 100){
                //     //Tone.Transport.bpm.value += Y*.01;
                //     //pingPong.set({delayTime: currentTime + (.01*Y)});
                // }
                
            }
        }

        if(!B && frameCount - buttonFrame > 60 && frameCount > 120){
            buttonFrame = frameCount;
            //console.log("BUTT||||");
            //synth.triggerAttackRelease(["A4", "G4", "C#4"], "4n");
            //memPart.start(0);

            //membrane.triggerAttackRelease("C2", "8n");


        }
        if(!sw && !swLock){
            


            swLock = true;
            console.log("Click At frame -> ", frameCount);
            switchCount++;
            frameAtClick = frameCount;

            recR -= 200*switchDirection +  -1*(switchCount % 6 - 12);
            recG -= 40*switchDirection;
            recB += 20*switchDirection;

            switch(switchCount){
                default:
                    backB++;
                    
                case 0: break;

                case 22: 
                    lowFreqO.connect(backG);

                case 18:
                    lowFreqO.connect(fmSynth.detune);
                
                case 17:
                    memPart.add([[ 0, "273"], ["0:2", "274"] ])

                    mem2.connect(feedbackDelay);
                case 16:
                    memPart2.playbackRate = .04

                case 15:
                    memPart.playbackRate += .02;
                    partP.add("1:3", "D#3");
                    seq.playbackRate += .07;

                    
                case 14:
                    membrane.connect(crusher);
                    lowFreqO.frequency.value +=.1;

                case 13:
                    partP.add("0:1", "B3");
                    
                    partPoly.stop("0:2");
                    memPart2.playbackRate += .3;

                    //lowFreqO

                case 12:
                    memPart2.add(["A2", "A2", "A2", "A2"]);
                
                case 11:
                    
                    memPart2.start(0);
                    verb.roomSize = .3
                    verb.dampening.value = 1000;
                    
                    



                case 10:
                    lowFreqO.connect(filter3);
                    filterTwo.set({frequency: 360- frameCount % 125});
                    partP.playbackRate = 1.8;
                    
                    
                    

                    

                case 8:
                    fadeDarker = false;
                    fadeYellow = true;
                    plucky.connect(verb);
                    seq.probibility = .62;
                    //seq.humanize = .01;
                    //fmPart2.start(0);
                case 7:

                    
                    partPoly.start(0);
                    
                    
                    

                case 6:
                    //memPart.add("1:0:2", "D2");
                    //plucky.dampening.value -= 200;
                    plucky.attackNoise = frameCount % 6;
                    membrane.connect(filterTwo)
                case 5:
                    feedbackDelay.set({
                        delayTime: .7
                    });
                    //memPart.add("1:1:2", "D2");
                    
                    membrane.pitchDecay.value += 0.06;
                    if(switchCount<8) fadeDarker = true;
                    //membrane.connect(filterTwo)
                    memPart.add(1, "B1");

                case 4:
                    //partP.add(1, "F4")
                    //partP.add("1:1", "E4");
                    

                    seq.probibility = .75;
                    filterOne.connect(crusher);

                case 3:
                    
                    
                    partP.start(0);
                    

                    //
                case 2:
                    //lowFreqO.connect(fmSynth.frequency);
                    //lowFreqO.start(0)
                    plucky.connect(filterTwo);
                    

                    memPart.start(0);

                
                //Master Start Last;
                case 1:
                    
                    
                    Tone.Transport.start();
                    break;



                
                
                
            }

            
            


            switchDirection *= -1;

            //partP.start(0);
            swLock = true;


        }


        filterOne.set({

            frequency: filterFreq,
            
        });

        

        //let testA = rect(0,0, 200, 200);
        //testA.fill(201, 220, 195);
        //cursorRect.erase();
        

    }
  



