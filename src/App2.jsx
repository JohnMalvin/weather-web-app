import { useEffect, useState } from "react";
import { getOthersWeatherData } from "./CLIENT_HELPER.JS";
import Display2 from "./Display2";
import Others from "./Others2";
import { use } from "react";


export default function WeatherDisplay() {
  const [locationData, setLocationData] = useState("Sydney");
  const [cities, setCities] = useState(["Melbourne", "Brisbane", "Canberra"]);

  useEffect(() => { 
    console.log("Location Data:", locationData);
    console.log("Cities:", cities);
  }, [locationData, cities]);
  return (
    <>
      <Display2
        locationData={locationData}
        celciusData={false}
      />
      <Others
        locationData={locationData}
        setLocationData={setLocationData}
        setCities={setCities}
        cities={cities}
        celcius={false}
      />
    </>
  );
}
