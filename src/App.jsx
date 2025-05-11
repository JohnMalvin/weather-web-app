import Display from './Display'
import Header from './Header'
import Others from './Others'
import Forecast from './Forecast'
// import Test from './Test'

import './index.css'
import './component.css'
import { useEffect, useState } from 'react'

function App() {
  // let storedCelcius = localStorage.getItem("celcius");
  // storedCelcius = storedCelcius === "false";
  // if (!storedCelcius) {
  //   storedCelcius = true;
  //   localStorage.setItem("celcius", storedCelcius);
  // }
  const [array, setArray] = useState(["Melbourne", "London", "Kaohsiung"]);
  const [location, setLocation] = useState("Sydney");
  const [celcius, setCelcius] = useState(() => {
    const storedCelcius = localStorage.getItem("celcius");
    return storedCelcius !== null ? storedCelcius === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("celcius", String(celcius));
  }, [celcius])

  return (
    <>
      <Header className='comp-header'
        location={location} 
        setLocation={setLocation} 
        setCelcius={setCelcius}
        array={array}
        setArray={setArray}
      />
      <div className="main-main-container">
        <div className='main-container'>

            <Display
              location={location} 
              celcius={celcius}
            />

            <Forecast
              celcius = {celcius}
              location={location}

            />
            
            <Others className='others'
              celcius={celcius} 
              location={location} 
              setLocation={setLocation} 
              array={array} 
              setArray={setArray} 
            />

            {/* <Test/> */}
        </div>
      </div>
    </>
  )
}

export default App
