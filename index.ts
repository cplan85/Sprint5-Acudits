import { RequestOption, jokeData, reportAcudit } from "./interfaces";
import { Score } from "./types";

let currentJoke: string = "";
let lat: string = "";
let long: string = "";
let currentWeather: string = "";
let reportAcudits: reportAcudit[] = [];
let geekJokes: boolean = false;

export async function getJoke(): Promise<void> {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const requestOption1: RequestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const requestOption2: RequestOption = {
    method: "GET",
    redirect: "follow",
  };

  const apiUrl: string = "https://icanhazdadjoke.com/";
  const apiUrl2: string =
    "https://geek-jokes.sameerkumar.website/api?format=json";

  geekJokes
    ? fetchJokes(apiUrl2, requestOption2)
    : fetchJokes(apiUrl, requestOption1);
}

const fetchJokes = (apiUrl: string, requestOptions: RequestOption): void => {
  const jokeDisplay = document.querySelector("#joke-container");
  fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const parsedResult: jokeData = JSON.parse(result);
      console.log(parsedResult);
      jokeDisplay.textContent = parsedResult.joke;
      currentJoke = parsedResult.joke;
      geekJokes = !geekJokes;
    })
    .catch((error) => console.log("error", error));
};
export const giveScore = (score: Score) => {
  const currentTime = new Date();
  let jokeDate = currentTime.toISOString();

  //can only give a score if you have at least one joke up on the screen.
  if (currentJoke !== "") {
    //if the joke is the same, only modify the score within the array
    if (reportAcudits.length > 0 && isSameJoke(reportAcudits)) {
      //use find function in case joke repeats again.
      reportAcudits[reportAcudits.length - 1].score = score;
    } else {
      reportAcudits.push({ joke: currentJoke, score: score, date: jokeDate });
    }
  } else {
    console.log("there are no jokes!");
  }

  console.log(reportAcudits);
};

const isSameJoke = (reports: reportAcudit[]) => {
  return reports.filter((report) => report.joke === currentJoke).length > 0
    ? true
    : false;
};

//DISPLAY OF WEATHER IS PROBABLY NOT NECESSARY

var locationDisplay = document.getElementById("user-location");
var weatherDisplay = document.getElementById("weather-container");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationDisplay.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function getWeather(): Promise<void> {
  const key: string = "c6e04a286ab44cf5842181305222805";
  const apiUrl: string = "http://api.weatherapi.com/v1/current.json?key=";
  const locationParam: string = `&q=${lat}, ${long}&aqi=no`;

  const fullAPI = `${apiUrl}${key}${locationParam}`;

  await fetch(fullAPI)
    .then((response) => response.text())
    .then((result) => {
      const parsedResult = JSON.parse(result);
      console.log("WEATHER", parsedResult);
      currentWeather = parsedResult.current.condition.text;
      let currentTemp_C = parsedResult.current.temp_c;
      let weatherImg: string = parsedResult.current.condition.icon;

      weatherDisplay.innerHTML = `Today it is ${currentWeather} and ${currentTemp_C}° C`;

      var img = document.createElement("img");
      img.src = `http:${weatherImg}`;
      console.log(weatherImg);
      weatherDisplay.appendChild(img);
    })
    .catch((error) => console.log("error", error));
}

function showPosition(position: GeolocationPosition) {
  lat = position.coords.latitude.toString();
  long = position.coords.longitude.toString();
  getWeather();
  locationDisplay.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

getLocation();
