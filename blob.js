"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBlob = void 0;
function generateBlob() {
    const percentage1 = randomNum(25, 75);
    const percentage2 = randomNum(25, 75);
    const percentage3 = randomNum(25, 75);
    const percentage4 = randomNum(25, 75);
    var percentage11 = 100 - percentage1;
    var percentage21 = 100 - percentage2;
    var percentage31 = 100 - percentage3;
    var percentage41 = 100 - percentage4;
    var borderRadius = `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
    document.getElementById("main-container").style.borderRadius = borderRadius;
}
exports.generateBlob = generateBlob;
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
