import { useEffect } from "react";
import { getWeatherData } from "./CLIENT_HELPER.JS";
import Display2 from "./Display2";



export default function WeatherDisplay() {


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await getWeatherData("Sydney", 0, 0, false); // 26 hours from now, in °F
        console.log(weather);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchWeather();
  }, []);



  return (
    <>
      <Display2 />
    </>
  );
}
