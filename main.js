img="";
status="";
objects=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(700,500);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML="status = detecting objects";
}

function model_loaded(){
    console.log("Model is loaded");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(img, 0,0,700,500);

    if(status!=""){
        for(p=0; p < objects.length; p++){
            document.getElementById("status").innerHTML="status : Object Detected";

            fill("purple");
            percent=Math.floor(objects[p].confidence * 100);
            text(objects[p].label+" "+ percent + "%" , objects[p].x+15, objects[p].y+15);
            noFill();
            stroke("purple");
            rect(objects[p].x, objects[p].y, objects[p].width, objects[p].height);
        }
    }
}