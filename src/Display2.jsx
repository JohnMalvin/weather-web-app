import './index.css'
import {useState, useEffect} from 'react';

// import REACT_ICON from './assets/react.svg'
import ICON_INFO from './assets/ICONS/ICON-INFO.svg'
import ICON_HUMID from './assets/ICONS/ICON-HUMID.svg'
import ICON_WIND from './assets/ICONS/ICON-WIND.svg'
import ICON_TEMP from './assets/ICONS/ICON-TEMP.svg'
import ICON_UV from './assets/ICONS/ICON-UV.svg'
import SPINNER from "./assets/SPINNER.svg";
import { getWeatherData } from './CLIENT_HELPER.JS';
import PropTypes from 'prop-types';


function Display({ locationData , celciusData, loading}) {
    const [time, setTime] = useState("00:00");
    
    function updateTime(){
        var clock = new Date();
        let hour = String(clock.getHours());
        let minute = String(clock.getMinutes());
        
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        if (hour.length == 1) {
            hour = "0" + hour;
        }
    
        setTime(hour + ":" +minute);
    }
    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    
    const[info, setInfo] = useState(false);
    
    function displayInfo() {
        setInfo(true);
        setTimeout(() => setInfo(false), 1000);
    }

    const [location, setLocation] = useState(locationData);
    const [formattedLocation, setFormattedLocation] = useState("Sydney, Australia");
    const [c_degree, setC_degree] = useState("0°C");
    const [f_degree, setF_degree] = useState("0°F");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [humidity, setHumidity] = useState(0 + "%");
    const [uv_index, setUv_index] = useState(0 + " UV");
    const [wind, setWind] = useState(0  + " km/h");
    const [image, setImage] = useState("https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg");
    const [displayLoading, setDisplayLoading] = useState(true);
    
    useEffect(() => {
        if (loading) {
            setDisplayLoading(true);
        }
    }, [loading])

    useEffect(() => {
        setLocation(locationData);
    }, [locationData]);
    
    useEffect(() => {
        let ignore = false;
        const fetchWeather = async () => {
            try {
                if (ignore) return;
                const weather = await getWeatherData(location, 0, 0, false);
                console.log(weather);
                setC_degree(Math.ceil(weather.temperature) + "°C");
                setF_degree(String(Math.ceil(weather.temperature * 9 / 5 + 32)) + "°F");
                setDescription(weather.description);
                setCondition(weather.condition);
                setHumidity(weather.humidity + "%");
                setUv_index(weather.uvIndex + " UV");
                setWind(weather.windspeed + " km/h");
                setFormattedLocation(`${weather.location.city}, ${weather.location.country}`);
                setImage(weather.image);
                setDisplayLoading(false);

            } catch (err) {
                console.error(err);
            }
        };
    
        if (location) fetchWeather();
        return () => { ignore = true; };
    }, [celciusData, location]);

    return(
        <div className='comp-display'>
            <div className="display">
                <div className="display-wrapped">
                    <img className='display-image' src={displayLoading ? SPINNER: image}></img>
                    <img className='display-info icon' src={ICON_INFO} onClick={displayInfo}></img>
                    <div className="display-time">{time}</div>
                    <div className="display-degree">{celciusData? c_degree: f_degree}</div>
                    <div className="display-content">
                        <div className="display-city">{formattedLocation}</div>
                        <div className="display-condition">{condition}</div>
                        <div className="display-para">{description}</div>
                    </div>
                    <div className="display-detail">
                        <div className="details-divide">
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src={ICON_TEMP}></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? celciusData? f_degree: c_degree :"Temperature"}</p>
                            </div>
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src={ICON_HUMID}></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? humidity : "Humidity"}</p>
                            </div>
                        </div>
                        <div className="details-divide">
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src={ICON_UV}></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? uv_index : "UV-index"}</p>
                            </div>
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src={ICON_WIND}></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? wind : "Wind Force"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="display-details"></div>
            </div>
            <div className="display-add"></div>
        </div>

    )
}

Display.propTypes = {
    locationData: PropTypes.string.isRequired,
    celciusData: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default Display;