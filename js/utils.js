'use strict';

/** @returns {Number} Random int in [min, max) */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/** @description Color string for Chart.js */
function getRandomColorString() {
    var r = getRandomInt(0, 256);
    var g = getRandomInt(0, 256);
    var b = getRandomInt(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}



// todo: use custom UI
function showMessage(message) {
    alert(message);
}

function logMessage(message) {
    console.log(message);
}

function logError(error) {
    console.error(error);
}
