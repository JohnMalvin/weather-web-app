import { useEffect, useState } from "react";
import Display2 from "./Display2";
import Others from "./Others2";
import Forecast from "./Forecast2";
import './index.css'
import './component.css'
import Header from "./Header2";

export default function WeatherDisplay() {
  const [locationData, setLocationData] = useState("Sydney");
  const [cities, setCities] = useState(["Melbourne", "Brisbane", "Canberra"]);

  useEffect(() => { 
    console.log("Location Data:", locationData);
    console.log("Cities:", cities);
  }, [locationData, cities]);
  return (
    <>
      <Header
        locationData={locationData}
        setLocationData={setLocationData}
        setCities={setCities}
        cities={cities}
        celcius={false}
      />
      
      <div className="main-main-container">
        <div className="main-container">

          <Display2
            locationData={locationData}
            celciusData={false}
            />
          
          <Forecast
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
        </div>
      </div>
    </>
  );
}
