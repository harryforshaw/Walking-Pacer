'use strict';

let timePara;
let distancePara;
let pacePara;
let activePara;

const highlightHandler = function(evt){
    //Handles clicks on a button
    //The property evt.target.innerText is the content of the button as displayed on screen
    if(evt.target !== activePara) {
        if (activePara) {
            activePara.innerText = activePara.innerText.replace('|', '');
        }
        activePara = evt.target;
        if (!activePara.innerText.includes('|')) {
            activePara.innerText += '|';
        }
    }

};

const buttonClickHandler = function (evt) {
    let buttonValue = evt.target.innerText;
    if (activePara) {
        if (buttonValue === '⇦') {
            if (activePara.innerText === "0|") {
                buttonValue = "0|";
            } else {
                activePara.innerText = activePara.innerText.substring(0, activePara.innerText.length - 2) + "|";
                buttonValue = activePara.innerText;
            }
        } else if (buttonValue === 'C') {
            activePara.innerText = "0|";
        } else if (activePara.innerText === "0|") {
            activePara.innerText = buttonValue + '|';
        } else if (activePara === distancePara && distancePara.innerText.length  > 5) {
            window.alert("Too many digits");
            activePara.innerText = activePara.innerText.slice(0, 5) + '|';
        } else if (activePara === timePara && timePara.innerText.length  > 3) {
            window.alert("Too many digits");
            activePara.innerText = activePara.innerText.slice(0, 3) + '|';
        } else {
            activePara.innerText = activePara.innerText.replace('|', buttonValue) + '|';
        }
    }
};



const resultHandler = function (evt){
    let distance = parseInt(distancePara.innerText);
    let time = parseInt(timePara.innerText);

    if (distance >= 10 && time >= 5) {
        distance = distance /1000;
        const pace = (time / distance).toFixed(0);
        pacePara.innerText = pace + " mins/km";
    } else {
        pacePara.innerText = "--";
    }

};
let startLat,startLon,startTime;
const startHandler = function (evt){
    let button = evt.target.innerText;
    let value = document.getElementById('start');
    if(button === 'Start'){
        navigator.geolocation.watchPosition(showPosition);
        startTime = Date.now();
        value.innerHTML = 'Stop';
    } else if(button === 'Stop') {
        value.innerText = 'Start';
        navigator.geolocation.clearWatch(showPosition);
        startLat = null;
        startLon = null;
    }


};

function showPosition(position) {
    if(!startLat || !startLon){
        startLat = position.coords.latitude;
        startLon = position.coords.longitude;
    } else {
        let distance = calculateDistance(position);
        document.getElementById('livedistance').innerText = distance.toFixed(0) + 'km';
        calculatePace(distance);
    }
}
function calculateDistance(position){
        let finalLat = position.coords.latitude;
        let finalLon = position.coords.longitude;
        const r = 6371;
        let lat = (finalLat - startLat) * (Math.PI / 180);
        let lon = (finalLon - startLon) * (Math.PI / 180);

    let a =
        Math.sin(lat / 2) * Math.sin(lat / 2) +
        Math.cos((Math.PI /180) * (startLat)) * Math.cos((Math.PI/180) * (finalLat)) * Math.sin(lon / 2) * Math.sin(lon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return r * c;


}

function calculatePace(distance){
    let timeTaken = Date.now() - startTime;
    timeTaken /= 60000;
    let pace = timeTaken /distance;
    document.getElementById('livepace').innerText = pace.toFixed(0) + 'mins/km';



}


const inclineHandler = function (event){
    let inclinePara = document.getElementById('incline');
    let slopeType = '';
    let gamma = event.gamma;
    let beta = event.beta;

    let degree = Math.atan2(beta,gamma) * (180/Math.PI);

    let percentage = Math.abs(Math.tan(degree) * 100);

    if(degree < 0){
        slopeType = 'Downhill';
    } else{
        slopeType = 'Uphill';
    }

    inclinePara.innerText = `◬ ${percentage}% ${slopeType}(${degree}°) ◬`;
    setTimeout(function (){
        inclinePara.innerText = '◬ Tap to show incline ◬';
    },30000);

};

const init = function() {
    timePara = document.getElementById("time");
    timePara.innerText = "0";
    distancePara = document.getElementById("distance");
    distancePara.innerText = "0";
    pacePara = document.getElementById("pace");
    pacePara.innerText = "...";
    activePara = distancePara;
    activePara.innerText += '|';
    document.getElementById("time").addEventListener("click",highlightHandler);
    document.getElementById("distance").addEventListener("click",highlightHandler);
    document.getElementById("pace").addEventListener("click",resultHandler);
    document.getElementById("b0").addEventListener("click", buttonClickHandler);
    document.getElementById("b1").addEventListener("click", buttonClickHandler);
    document.getElementById("b2").addEventListener("click", buttonClickHandler);
    document.getElementById("b3").addEventListener("click", buttonClickHandler);
    document.getElementById("b4").addEventListener("click", buttonClickHandler);
    document.getElementById("b5").addEventListener("click", buttonClickHandler);
    document.getElementById("b6").addEventListener("click", buttonClickHandler);
    document.getElementById("b7").addEventListener("click", buttonClickHandler);
    document.getElementById("b8").addEventListener("click", buttonClickHandler);
    document.getElementById("b9").addEventListener("click", buttonClickHandler);
    document.getElementById("clear").addEventListener("click", buttonClickHandler);
    document.getElementById("left").addEventListener("click", buttonClickHandler);
    document.getElementById("start").addEventListener("click",startHandler);
    document.getElementById("incline").addEventListener("click",inclineHandler);


};

window.addEventListener("pageshow", init);
