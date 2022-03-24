//Nicho

var lfo;
var highFilter;
var sineSynthTwo;
var toneNoise;
var toneNoise2;
var col, canv;
let img;





function preload(){ 
  
  
  img = loadImage('dolph.png');
}




function setup() {
  canv = createCanvas(1300, 700);
  canv.mouseReleased(change);
  col = 200;
  


  sineSynthTwo = new Tone.Synth({
    oscillator: { type: "sine" }
  });
  
  
  sineSynth = new Tone.Synth({
    oscillator: { type: "sine" }
  });

  
	
  
  
  lfo = new Tone.LFO(25, 25, 500);
  env = new Tone.Envelope(.89, .50, .50, 1);
  sineSynth.toMaster();
  sineSynthTwo.toMaster();
  lfo.connect(sineSynth.frequency);
  lfo.start();
  
  fill(0);
  
  
}




function draw() {
  //background(col, 20, 100);
  //image(img, 0,0);
  

}
function mouseReleased() {
  //col = col + 50;
  //console.log("MOUSE");

  sineSynth.frequency.value = 275;
  //sineSynth.envelope.
  sineSynth.triggerAttackRelease(250, 0.75);  
  lfo.start();
  sineSynthTwo.frequency.value = 250;
  sineSynth.frequency.setValueAtTime(421, "+0.88");
  sineSynthTwo.triggerAttackRelease(270, 0.88);
  
  

  

}

function mousePressed(){
  image(img, 0,0);

}
function change(){
  //console.log("CHNGE");
}






