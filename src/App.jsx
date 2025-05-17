import { useEffect, useState } from "react";
import Display from "./Display";
import Others from "./Others";
import Forecast from "./Forecast";
import './index.css'
import './component.css'
import Header from "./Header";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(() => {
    return localStorage.getItem("locationData") || "Sydney";
  });
  
  const [cities, setCities] = useState(() => {
    const stored = localStorage.getItem("cities");
    return stored ? JSON.parse(stored) : ["Melbourne", "Brisbane", "Canberra"];
  });
  
  const [celciusData, setCelciusData] = useState(() => {
    const stored = localStorage.getItem("celciusData");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("locationData", locationData);
  }, [locationData]);
  
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);
  
  useEffect(() => {
    localStorage.setItem("celciusData", JSON.stringify(celciusData));
  }, [celciusData]);

  useEffect(() => {
    setLoading(true);
    console.log("Loading data for:", locationData);
    console.log("Celcius Data:", celciusData);
  }, [locationData, celciusData]);
  return (
    <>
      <Header
        locationData={locationData}
        setLocationData={setLocationData}
        setCities={setCities}
        cities={cities}
        setCelciusData={setCelciusData}
        celciusData={celciusData}
      />
      
      <div className="main-main-container">
        <div className="main-container">

          <Display
            locationData={locationData}
            celciusData={celciusData}
            loading={loading}
            />
          
          <Forecast
            locationData={locationData}
            celciusData={celciusData}
            loading={loading}
            setLoading={setLoading}
            />
          
          <Others
            locationData={locationData}
            setLocationData={setLocationData}
            setCities={setCities}
            cities={cities}
            celcius={celciusData}
            loading={loading}
            />
        </div>
      </div>
    </>
  );
}
