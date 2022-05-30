"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = exports.isSameJoke = void 0;
const isSameJoke = (reports, currentJoke) => {
    return reports.filter((report) => report.joke === currentJoke).length > 0
        ? true
        : false;
};
exports.isSameJoke = isSameJoke;
function getLocation(weatherDisplay) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}
exports.getLocation = getLocation;
