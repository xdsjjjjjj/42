function setup(){
canvas=createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classfiyCanvas);
synth= window.speechSynthesis;
}
function clear_canvas(){
background("white");
}
function preload(){
classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        Line(pmouseX, pmouseY, mouseX,mouseY);
    }
}
function classfiyCanvas(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error,results){
   if(error) {
       console.error (error);
   }
   else{
       console.log(results);
       document.getElementById("label").innerHTML='Label : '+results[0].label;
       document.getElementById("confidence").innerHTML='Confidence : '+Math.round(results[0].confidence*100)+' %';
       utterthis=new SpeechSynthesisUtterance(results[0].label);
       synth.speak(utterthis);
   }
}