"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveScore = exports.getJoke = void 0;
let currentJoke = "";
let lat = "";
let long = "";
let currentWeather = "";
let reportAcudits = [];
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokeDisplay = document.querySelector("#joke-container");
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const apiUrl = "https://icanhazdadjoke.com/";
        yield fetch(apiUrl, requestOptions)
            .then((response) => response.text())
            .then((result) => {
            const parsedResult = JSON.parse(result);
            jokeDisplay.textContent = parsedResult.joke;
            currentJoke = parsedResult.joke;
        })
            .catch((error) => console.log("error", error));
    });
}
exports.getJoke = getJoke;
const giveScore = (score) => {
    const currentTime = new Date();
    let jokeDate = currentTime.toISOString();
    //can only give a score if you have at least one joke up on the screen.
    if (currentJoke !== "") {
        //if the joke is the same, only modify the score within the array
        if (reportAcudits.length > 0 && isSameJoke(reportAcudits)) {
            //use find function in case joke repeats again.
            reportAcudits[reportAcudits.length - 1].score = score;
        }
        else {
            reportAcudits.push({ joke: currentJoke, score: score, date: jokeDate });
        }
    }
    else {
        console.log("there are no jokes!");
    }
    console.log(reportAcudits);
};
exports.giveScore = giveScore;
const isSameJoke = (reports) => {
    return reports.filter((report) => report.joke === currentJoke).length > 0
        ? true
        : false;
};
//DISPLAY OF WEATHER IS PROBABLY NOT NECESSARY
var locationDisplay = document.getElementById("user-location");
var weatherDisplay = document.getElementById("user-weather");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        locationDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = "c6e04a286ab44cf5842181305222805";
        const apiUrl = "http://api.weatherapi.com/v1/current.json?key=";
        const locationParam = `&q=${lat}, ${long}&aqi=no`;
        const fullAPI = `${apiUrl}${key}${locationParam}`;
        yield fetch(fullAPI)
            .then((response) => response.text())
            .then((result) => {
            const parsedResult = JSON.parse(result);
            console.log("WEATHER", parsedResult);
            currentWeather = parsedResult.current.condition.text;
            let weatherImg = parsedResult.current.condition.icon;
            weatherDisplay.innerHTML = currentWeather;
            var img = document.createElement("img");
            img.src = `http:${weatherImg}`;
            console.log(weatherImg);
            weatherDisplay.appendChild(img);
        })
            .catch((error) => console.log("error", error));
    });
}
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    getWeather();
    locationDisplay.innerHTML =
        "Latitude: " +
            position.coords.latitude +
            "<br>Longitude: " +
            position.coords.longitude;
}
getLocation();
