img = "";
object = [];
status = "";

function preload() {
img = loadImage('dog_cat.jpg');
song = loadSound("mixkit-vintage-warning-alarm-990.wav");    
}

function setup() {
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
console.log("Model Loaded!");
status = true;   
}

function gotresults(error,results) {
if (error) {
console.error(error);    
}else {
console.log(results);
object = results;
}    
}

function draw() {
image(video,0,0,380,380);
if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video,gotresults);
    for ( i = 0; i < object.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        if (object.length<1) {
           document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
           song.play();
        } else {
        document.getElementById("number_of_objects").innerHTML = "Baby Found";
           song.stop();    
        }
        fill(r,g,b);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%" , object[i].x + 15 , object[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
        
    }
}

}