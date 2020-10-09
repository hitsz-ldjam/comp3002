'use strict';

/** @returns {Number} Random int in [min, max) */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/** @description Color string for Chart.js */
function randomColorString() {
    var r = randomInt(0, 256);
    var g = randomInt(0, 256);
    var b = randomInt(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}
