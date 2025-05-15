import { useEffect, useState } from "react";
import { getTempinCel } from "./CLIENT_HELPER.JS";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log(WEATHER_API_KEY);
function App2() {
    const [temp, setTemp] = useState(0);
    useEffect(() => {
        fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/SYDNEY?unitGroup=us&include=minutes%2Cevents%2Calerts%2Ccurrent&key=AG4CQFT7CK4A6DBLTPQQ7PMB7&contentType=json", {
            "method": "GET",
            "headers": {
            }
            })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.error(err);
          });
    }, []);
  return (
    <div>
        <h1>My App</h1>
        <h2>Temperature in Sydney: {temp}°C</h2>
    </div>
  );
}
export default App2;