

prediction1="";
prediction2="";
Webcam.set({
    width:350,height:300,image_format:"png",png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image"src="'+data_uri+'">';
    });
}
console.log("ml5 version",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json",modelloaded);
function modelloaded(){
    console.log("model has loaded")
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The First Prediction Is "+prediction1;
    speak_data2="The Second Prediction Is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresult);
}

function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result1").innerHTML=result[0].label;
        document.getElementById("result2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(result[0].label=="happy"){
            document.getElementById("update1").innerHTML="&#128522;";

        }

        if(result[0].label=="sad"){
            document.getElementById("update1").innerHTML="&#128532;";
            
        }

        if(result[0].label=="angry"){
            document.getElementById("update1").innerHTML="&#128548;";
            
        }

        if(result[1].label=="happy"){
            document.getElementById("update2").innerHTML="&#128522;";
            
        }

        if(result[1].label=="sad"){
            document.getElementById("update2").innerHTML="&#128532;";
            
        }

        
        if(result[1].label=="angry"){
            document.getElementById("update2").innerHTML="&#128548;";
            
        }

        
    }
}