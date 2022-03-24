//Nicholas
var title = "Synthesizer";
var instructions = "   [z],[x],[c],[v],[b] to play";
var lfo;
var highFilter;
var squareSynth;
var toneNoise;
var toneNoise2;





function setup() {
  createCanvas(1300, 700);
  background(210, 20, 100);


  squareSynth = new Tone.Synth({
    oscillator: { type: "square" }
  });
  
  
  sineSynth = new Tone.Synth({
    oscillator: { type: "sine" }
  });

  
	
  
  highFilter = new Tone.Filter(12000, "highpass");
  squareSynth.connect(highFilter);
  lfo = new Tone.LFO(90, 25, 500);
  sineSynth.toMaster();
  highFilter.toMaster();
  lfo.connect(sineSynth.frequency);
  lfo.start();
  fill(0);
  textSize(35);
  noStroke();
  textAlign(100, 100);
  fill(0);
  text(title, 25, 50);
  text(instructions, 300, 100);
}




function draw() {

}





function keyPressed() {
  console.log('Key is: ' + keyCode);
  
  if (keyCode == 90) { // z key
		//toneNoise.triggerAttackRelease(1);
    sineSynth.frequency.value = 275;
    sineSynth.frequency.setValueAtTime(215, "+0.05");
    sineSynth.triggerAttackRelease(250, 0.15);

  } else if (keyCode == 88) { // x key
		squareSynth.frequency.value = 275;
    squareSynth.frequency.setValueAtTime(215, "+0.05");
    squareSynth.triggerAttackRelease(300, 0.75);
    
  } else if (keyCode == 67) { // c key
		squareSynth.frequency.value = 200;
    squareSynth.frequency.setValueAtTime(400, "+0.07");
    squareSynth.triggerAttackRelease(300, 0.88);

  } else if (keyCode == 86) { // v key
		sineSynth.frequency.value = 500;
    sineSynth.frequency.setValueAtTime(300, "+1.0");
    sineSynth.triggerAttackRelease(500, 0.75);

  } else if (keyCode == 66) { // b key

    lfo.start();
    sineSynth.frequency.value = 315;
    sineSynth.frequency.setValueAtTime(200, "+0.35");
    sineSynth.triggerAttackRelease(300, 0.3);

  }
}