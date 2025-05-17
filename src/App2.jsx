import { useEffect, useState } from "react";
import Display2 from "./Display2";
import Others from "./Others2";
import Forecast from "./Forecast2";


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
      <Forecast
        locationData={locationData}
        celciusData={false}
      />
    </>
  );
}
