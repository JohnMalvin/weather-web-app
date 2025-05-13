import './index.css'
// import './component.css'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import REACT_ICON from './assets/react.svg'
import ICON_HUMID from './assets/ICONS/ICON-HUMID.svg'
import ICON_WIND from './assets/ICONS/ICON-WIND.svg'
import ICON_UV from './assets/ICONS/ICON-UV.svg'

function Others({celcius, location, setLocation, array, setArray}) {
    // const [array, setArray] = useState(["Melbourne", "London", "Kaohsiung"]);
    // let array = ["Melbourne", "London", "Kaohsiung"];
    const [city_JSON, setCITY_JSON] = useState([])
    
    useEffect(()=> {

        const fetchData = async() => {
            try {
                let datas = [];
                for (let i = 0; i < 3; i++) {

                    let URL =`http://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=${array[i]}&aqi=yes`;
                    let result = await fetch(URL);
                    let json = await result.json();
                    datas.push(json);
                    // console.log(json);
                }
                setCITY_JSON(datas);
                
            } catch (error) {
                console.log(error);
            }
        } 
        fetchData();
        
    }, [array])
    return(
        <div className='comp-others'>
            <div className="others-container others">
                { array.map((city, index) => {

                    let data = city_JSON[index];
                    let degree_c = data && data.current ? String(Math.ceil(data.current.temp_c)) + "°C" : "";
                    let degree_f = data && data.current ? String(Math.ceil(data.current.temp_f)) + "°F" : "";
                    let uv_index = data && data.current ? String(data.current.uv) + " UV" : "";
                    let wind = data && data.current ? String(data.current.wind_kph) + " kph" : "";
                    let humidity = data && data.current ? String(data.current.humidity) + "%" : "";
                    let target_city = data && data.current ? String(data.location.name) : "";
                    let target_country = data && data.current ? String(data.location.country) : "";
                    
                    let target_location = target_city + ", " + target_country;
                    // let target_location2 = target_location;
                    if (target_location.length > 25) {
                        target_location = target_location.slice(0, 25) + "...";
                    }
                    return (
                    <div className="others-card" key={city} onClick={()=> {
                        let new_array = [location, ...array];
                        new_array = new_array.filter(item => item !== city);
                        setArray(new_array);
                        localStorage.setItem("locations", city);
                        setLocation(city);
                    }}>
                        <div className="others-degree">{celcius? degree_c : degree_f}</div>
                        <div className="others-data">
                            <div className="others-location hide-on-desktop">{target_location}</div>
                            {/* <div className="others-location preview-on-desktop">{target_location2}</div> */}
                            <div className="others-detail-container">
                                <div className="others-detail">
                                    <img src={ICON_UV} className='icon no-cursor'></img>
                                    <p>{uv_index}</p>
                                </div>
                                <div className="others-detail">
                                    <img src={ICON_WIND} className='icon no-cursor'></img>
                                    <p>{wind}</p>
                                </div>
                                <div className="others-detail preview-on-desktop">
                                    <img src={ICON_HUMID} className='icon no-cursor'></img>
                                    <p>{humidity}</p>
                                </div>
                            </div>
                            <img src={REACT_ICON} className='others-image'></img>
                        </div>
                        
                    </div>
                    )})
                }

            </div>
        </div>
    )
}
Others.propTypes = {
    location: PropTypes.string.isRequired,
    celcius: PropTypes.bool.isRequired,
    setLocation: PropTypes.func.isRequired,
    setArray: PropTypes.func.isRequired,
    array: PropTypes.array.isRequired,
};
export default Others;