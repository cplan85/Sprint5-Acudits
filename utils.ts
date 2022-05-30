import { reportAcudit } from "./interfaces";


export const isSameJoke = (reports: reportAcudit[], currentJoke: string) => {
    return reports.filter((report) => report.joke === currentJoke).length > 0
      ? true
      : false;
  };

 export function getLocation(weatherDisplay: HTMLElement) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
  }