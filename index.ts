import { RequestOption, jokeData } from "./interfaces";

export async function getJoke(): Promise<void> {
  const jokeDisplay = document.querySelector("#joke-container");

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions: RequestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiUrl: string = "https://icanhazdadjoke.com/";

  await fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const parsedResult: jokeData = JSON.parse(result);
      console.log(parsedResult.joke);
      jokeDisplay.textContent = parsedResult.joke;
    })
    .catch((error) => console.log("error", error));
}
