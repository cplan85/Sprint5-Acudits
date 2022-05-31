"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBlob2 = exports.giveScore = exports.getJoke = void 0;
let currentJoke = "";
let lat = "";
let long = "";
let currentWeather = "";
let reportAcudits = [];
let geekJokes = false;
// Exercici 1 & Exercici 5
function getJoke() {
  return __awaiter(this, void 0, void 0, function* () {
    //generateBlob();
    getColors();
    generateBlob2("main-container");
    generateBlob2("right-blob");
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOption1 = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const requestOption2 = {
      method: "GET",
      redirect: "follow",
    };
    const apiUrl = "https://icanhazdadjoke.com/";
    const apiUrl2 = "https://geek-jokes.sameerkumar.website/api?format=json";
    geekJokes
      ? fetchJokes(apiUrl2, requestOption2)
      : fetchJokes(apiUrl, requestOption1);
  });
}
exports.getJoke = getJoke;
const fetchJokes = (apiUrl, requestOptions) => {
  const jokeDisplay = document.querySelector("#joke-container");
  fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const parsedResult = JSON.parse(result);
      console.log(parsedResult);
      jokeDisplay.textContent = parsedResult.joke;
      currentJoke = parsedResult.joke;
      geekJokes = !geekJokes;
    })
    .catch((error) => console.log("error", error));
};
const isSameJoke = (reports, currentJoke) => {
  return reports.filter((report) => report.joke === currentJoke).length > 0
    ? true
    : false;
};
//Exercici 3
const giveScore = (score) => {
  const currentTime = new Date();
  let jokeDate = currentTime.toISOString();
  //can only give a score if you have at least one joke up on the screen.
  if (currentJoke !== "") {
    //if the joke is the same, only modify the score within the array
    if (reportAcudits.length > 0 && isSameJoke(reportAcudits, currentJoke)) {
      //use find function in case joke repeats again.
      reportAcudits[reportAcudits.length - 1].score = score;
    } else {
      reportAcudits.push({ joke: currentJoke, score: score, date: jokeDate });
      getJoke();
    }
  } else {
    console.log("there are no jokes!");
  }
  console.log(reportAcudits);
};
exports.giveScore = giveScore;
var weatherDisplay = document.getElementById("weather-container");
function getLocation(weatherDisplay) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
  }
}
// Exercici 4
function getWeather() {
  return __awaiter(this, void 0, void 0, function* () {
    const key = "c6e04a286ab44cf5842181305222805";
    const apiUrl = "https://api.weatherapi.com/v1/current.json?key=";
    const locationParam = `&q=${lat}, ${long}&aqi=no`;
    const fullAPI = `${apiUrl}${key}${locationParam}`;
    yield fetch(fullAPI)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        console.log("WEATHER", parsedResult);
        currentWeather = parsedResult.current.condition.text;
        let currentTemp_C = parsedResult.current.temp_c;
        let weatherImg = parsedResult.current.condition.icon;
        weatherDisplay.innerHTML = `${currentWeather} | ${currentTemp_C}° C`;
        var img = document.createElement("img");
        img.src = `http:${weatherImg}`;
        console.log(weatherImg);
        weatherDisplay.appendChild(img);
      })
      .catch((error) => console.log("error", error));
  });
}
function showPosition(position) {
  lat = position.coords.latitude.toString();
  long = position.coords.longitude.toString();
  getWeather();
}
getLocation(weatherDisplay);
// Exercici 6 -  Pero en lugar de usar svg para un fondo, creé esta función para aleatorizar el fondo del blob
function generateBlob2(element) {
  const percentage1 = randomNum(25, 75);
  const percentage2 = randomNum(25, 75);
  const percentage3 = randomNum(25, 75);
  const percentage4 = randomNum(25, 75);
  var percentage11 = 100 - percentage1;
  var percentage21 = 100 - percentage2;
  var percentage31 = 100 - percentage3;
  var percentage41 = 100 - percentage4;
  var borderRadius = `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
  document.getElementById(element).style.borderRadius = borderRadius;
}
exports.generateBlob2 = generateBlob2;
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
// BONUS Esta función obtiene un esquema de color con 5 colores diferentes, y lo aplico a los elementos html en cada clic de botón.
const changeElementColor = (
  elementID,
  colorType,
  colorsArray,
  colorArrayIdx
) => {
  document.getElementById(elementID).style[colorType] = `rgb(${colorsArray[
    colorArrayIdx
  ].toString()})`;
};
// API para coger esquemas de colores
function getColors() {
  return __awaiter(this, void 0, void 0, function* () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var raw = '{"model":"default"}';
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://colormind.io/api/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let colorsArray = JSON.parse(result).result;
        const getRGB = (index) => {
          return `rgb(${colorsArray[index].toString()})`;
        };
        document.body.style.backgroundColor = getRGB(1);
        var elementHover = (styleProperty, hoverColor, outColor) => {
          return {
            hover: function (event) {
              event.target.style[styleProperty] = getRGB(hoverColor);
            },
            out: function (event) {
              event.target.style[styleProperty] = getRGB(outColor);
            },
          };
        };
        var buttonJoke = document.getElementById("btn-jokes");
        buttonJoke.addEventListener(
          "mouseover",
          elementHover("backgroundColor", 4, 3).hover,
          false
        );
        buttonJoke.addEventListener(
          "mouseout",
          elementHover("backgroundColor", 4, 3).out,
          false
        );
        const svgColors = document.getElementsByTagName("path");
        [...svgColors].forEach((item) => {
          item.style.fill = getRGB(1);
          item.addEventListener(
            "mouseover",
            elementHover("fill", 4, 1).hover,
            false
          );
          item.addEventListener(
            "mouseout",
            elementHover("fill", 4, 1).out,
            false
          );
        });
        const h1Color = document.getElementsByTagName("h1")[0];
        h1Color.style.color = getRGB(4);
        changeElementColor("main-container", "backgroundColor", colorsArray, 0);
        changeElementColor("right-blob", "backgroundColor", colorsArray, 3);
        changeElementColor("btn-jokes", "backgroundColor", colorsArray, 3);
        changeElementColor("btn-jokes", "color", colorsArray, 0);
        changeElementColor("joke-container", "color", colorsArray, 2);
        changeElementColor("weather-container", "color", colorsArray, 4);
        console.log("Colors", colorsArray);
      })
      .catch((error) => console.log("error", error));
  });
}
