status = "";
objects = [];
function preload(){
   console.log("Function preload()")
}
function setup(){
    canvas = createCanvas(380, 380);
    console.log("Canvas width = 380px and Canvas height = 380px");
    canvas.center();
    video = createCapture(VIDEO);
    console.log("Webcam is opened");
    video.size(380, 380)
    console.log("Webcam width = 380px and Webcam height = 380px");
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
    console.log(status);
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Detection complete";
            console.log("Status : Objects detected");
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects == person){
                document.getElementById("baby").innerHTML = "Baby is found";
            }
            else if(objects = baby){
                document.getElementById("baby").innerHTML = "Baby is found";
            }
            else{
                document.getElementById("baby").innerHTML = "Baby not found"
            }
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}