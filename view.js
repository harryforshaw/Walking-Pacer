'use strict';

let timePara;
let distancePara;
let pacePara;
let activePara;
let startTime;
let isStarted = false;
let prev;
let totalDistance;


const highlightHandler = function(evt){
    //Handles clicks on a button
    //The property evt.target.innerText is the content of the button as displayed on screen
    if(evt.target !== activePara) {
        if (activePara) {
            activePara.innerText = activePara.innerText.replace('|', '');
            activePara.style.color ='black';
        }
        activePara = evt.target;
        if (!activePara.innerText.includes('|')) {
            activePara.innerText += '|';
            activePara.style.color='red';



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
        localStorage.setItem('distance',distance);
        localStorage.setItem('time',time);
        distance = distance /1000;
        const pace = (time / distance).toFixed(0);
        pacePara.innerText = pace + " mins/km";

    } else {
        pacePara.innerText = "--";
    }

};
const startHandler = function (evt){
    let button = evt.target.innerText;
    let value = document.getElementById('start');
    if(button === 'Start'){
        navigator.geolocation.watchPosition(showPosition);
        startTime = Date.now();
        value.innerHTML = 'Stop';
        isStarted = true;
    } else if(button === 'Stop') {
        value.innerText = 'Start';
        navigator.geolocation.clearWatch(showPosition);
        prev = null;
        isStarted = false;
    }
};

function showPosition(position) {
    if(isStarted) {
        if(!prev){
            prev = position.coords;
        } else {
            let current = position.coords;
            let distance = calculateDistance(prev, current);
            totalDistance += distance;
            totalDistance =  distance * 1000;
            document.getElementById('livedistance').innerText = distance.toFixed(0) + 'm';
            calculatePace(distance);
            prev = current;
        }
    }
}

function calculateDistance(prev,current){ //https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
        let finalLat = current.coords.latitude;
        let finalLon = current.coords.longitude;
        let startLat = prev.coords.latitude;
        let startLon = prev.coords.longitude;
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
    let pace = timeTaken /(distance/1000);
    document.getElementById('livepace').innerText = pace.toFixed(0) + 'mins/km';



}
const orientationHandler = function(event) {

    let inclinePara = document.getElementById('incline');
    inclinePara.style.color = 'red';
    let slopeType = '';

    let degree = event.beta;

    let percentage = Math.abs(Math.tan(degree * (Math.PI/180)) * 100);

    if (degree < 0) {
        slopeType = 'Downhill';
    } else {
        slopeType = 'Uphill';
    }
    if (degree > 45) {
        inclinePara.innerText = 'Lying flat';
    } else {


        inclinePara.innerText = `◬ ${percentage.toFixed(0)}% ${slopeType}(${degree.toFixed(0)}°) ◬`;

    }
    setTimeout(function (){
        inclinePara.innerText = '◬ Tap to show incline ◬';
        inclinePara.style.color = 'black';
        window.removeEventListener("deviceorientation",orientationHandler);
    },30000);


};



const init = function() {
    let storeDistance = localStorage.getItem('distance');
    let storeTime = localStorage.getItem('time');
    distancePara = document.getElementById("distance");
    timePara = document.getElementById("time");
    if(storeTime === null) {
        timePara.innerText = "0";

    } else {
        timePara.innerText = storeTime;
    }
    if(storeDistance === null) {
        distancePara.innerText = "0";

    } else {
        distancePara.innerText = storeDistance;
    }
    pacePara = document.getElementById("pace");
    pacePara.innerText = "...";
    activePara = distancePara;
    activePara.innerText += '|';
    activePara.style.color='red';
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
        document.getElementById("incline").addEventListener("click", () => {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === "granted") {
                        window.addEventListener("deviceorientation", orientationHandler);
                    } else {
                        window.alert("Permission is needed!");
                    }
                })
                .catch(() => window.alert("Not supported"));
        });
    } else {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", orientationHandler);
        }
    }


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


};

window.addEventListener("pageshow", init);
