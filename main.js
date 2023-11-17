prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: 'png',
    pngQuality: 90
})
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    })
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZqMf34gW6/model.json', modelLoaded);

function modelLoaded() {
    window.alert('modelLoaded');
    console.log('modelLoaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1;
    speakData2 = "The second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Ok") {
            document.getElementById("updateEmoji").innerHTML = "&#128076";
        }
        if (results[0].label == "Like") {
            document.getElementById("updateEmoji").innerHTML = "&#128077";
        }
        if (results[0].label == "Dislike") {
            document.getElementById("updateEmoji").innerHTML = "&#128078";
        }
        if (results[0].label == "Wave") {
            document.getElementById("updateEmoji").innerHTML = "&#128075";
        }
        if (results[0].label == "Two fingers") {
            document.getElementById("updateEmoji").innerHTML = "&#9996";
        }
        if (results[1].label == "Ok") {
            document.getElementById("updateEmoji2").innerHTML = "&#128076";
        }
        if (results[1].label == "Like") {
            document.getElementById("updateEmoji2").innerHTML = "&#128077";
        }
        if (results[1].label == "Dislike") {
            document.getElementById("updateEmoji2").innerHTML = "&#128078";
        }
        if (results[1].label == "Wave") {
            document.getElementById("updateEmoji2").innerHTML = "&#128075";
        }
        if (results[1].label == "Two fingers") {
            document.getElementById("updateEmoji2").innerHTML = "&#9996";
        }
    }
}