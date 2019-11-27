//Stefano Ferrari - Hackaton 2019

// The sketch must:
// Load and play a given audio file, and use it as source for graphic generation; x
// Adapts to the size of the window; x
// Respond to window resizing; x
// Be able to be replayed at the end; x
// Be correctly uploaded on gitHub (DO NOT FORGET THE COVER.PNG)


var latoLungo, latoCorto, prevW, prevH, dX=0, dY=0;
var rotationAngle=0;
var presentFrameCount=0;
var i=0;

function preload(){
  tg1_new = loadSound('./assets/TG1_new.mp3');
  pianeta = loadImage('./assets/texture.jpg');
  tg1_logo = loadImage('./assets/tg1.png');
}



function setup() {
  cnv = createCanvas(windowWidth,windowHeight,WEBGL);
  cnv.mouseClicked(start);
  // button = createButton('Dinner Time');
  // button.position(windowWidth/2, windowHeight/2);
  // button.mouseClicked(start);
  angleMode(DEGREES);

  prevW = windowWidth;
  prevH = windowHeight;

  fft = new p5.FFT();
}


function draw() {
  if(windowWidth>windowHeight){
    latoLungo = windowWidth;
    latoCorto = windowHeight;
  }else{
    latolungo = windowHeight;
    latoCorto = windowWidth;
  }

if(prevH!=windowHeight){
  dY=(windowHeight-prevH)/2;
  // prevH=windowHeight;
}else{
  dY=0;
}

if(prevW!=windowWidth){
  dX=(windowWidth-prevW)/2;
  // prevW=windowWidth;
}else{
  dX=0;
}

    push();
    translate(dX,dY);
    // camera(0, 0, latoCorto/4+500, 0, 0, 0, 0, 1 ,0);
    background(color(23, 90, 232));
    if(tg1_new.isPlaying()){

      var spectrum = fft.analyze();

      var energy = fft.getEnergy('treble');
      console.log(energy);
      var time = tg1_new.currentTime();
      var timeRotation = map (time, 0, 13, 0, 360);
      var speed = map(energy, 0,255,0.01,100);
      rotationAngle=rotationAngle+speed;
      rotateY(0.2*(timeRotation+rotationAngle));
      rotateZ(-15);
      rotateX(-15);
      i=time*9.2;
    }
    else{
      rotateY(13*rotationAngle);
      rotateZ(-15);
      rotateX(-15);
    }
    noStroke();
    texture(pianeta);
    rotateY(180);
    sphere(latoCorto/4);
    pop();

    texture(tg1_logo);
    noStroke();
    push();
    translate(dX,dY);
    rotateY(120-i);
    quad(0,0,latoCorto/4+50,
        windowWidth*windowHeight*0.0003,0,latoCorto/4+50,
        windowWidth*windowHeight*0.0003, windowWidth*windowHeight*0.0003*0.615, latoCorto/4+50,
        0,windowWidth*windowHeight*0.0003*0.615,latoCorto/4+50);
    pop();

}
 function start(){
   if(tg1_new.isPlaying()){

   }else{
   tg1_new.play();
  }
 }
