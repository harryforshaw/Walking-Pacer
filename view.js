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
        if (buttonValue === '<-') {
            if (activePara.innerText === "0|") {
                buttonValue = "0|";
            } else {
                activePara.innerText = activePara.innerText.substring(0, activePara.innerText.length - 2) + "|";
                buttonValue = activePara.innerText;
            }
        } else if (buttonValue === 'C') {
            activePara.innerText = "0|";
              // Exit early to prevent further execution of the function
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



};

window.addEventListener("pageshow", init);
