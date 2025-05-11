import './index.css'
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function Display({ location , celcius}) {
    const toCelcius = celcius;

    const [URL, setURL] = useState(`http://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=Sydney&aqi=yes`)
    const [URL2, setURL2] = useState("")
    useEffect(()=> {
        // console.log(location);
        let new_url = `http://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=${location}&aqi=yes`
        setURL(new_url)
        
        let currentDate = new Date();
        let date1 = currentDate.toISOString().split('T')[0];

        let nextWeekDate = new Date();
        nextWeekDate.setDate(currentDate.getDate() + 7);
        let date2 = nextWeekDate.toISOString().split('T')[0];
        let URL2 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=D4HK23E92MQYVH3V9GAW5EAYE`
        setURL2(URL2)
    }, [location])

    const [weatherData, setWeatherData] = useState(null);
    const [weatherData2, setWeatherData2] = useState(null);
    useEffect(() => {
        const fetchData = async ()=>{
            try{
                const result = await fetch(URL);
                const json = await result.json();
                setWeatherData(json);
                // console.log(json);
                let currentDate = new Date();
                let date1 = currentDate.toISOString().split('T')[0];
        
                let nextWeekDate = new Date();
                nextWeekDate.setDate(currentDate.getDate() + 7);
                let date2 = nextWeekDate.toISOString().split('T')[0];
                let URL2 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=D4HK23E92MQYVH3V9GAW5EAYE`
                let result2 = await fetch(URL2);
                let json2 = await result2.json();
                // console.log("here it is")
                // console.log(json2);
                setWeatherData2(json2)
            } catch (error) {
                console.log(error);
                // console.log("ehvjewhjk");
            } 
            
        };
        fetchData();
    }, [URL, URL2]);``

    // const degree = String(weatherData.current.temp_c)+"°C";
    const degree_c = weatherData2 && weatherData && weatherData.current? String(Math.ceil((weatherData2.currentConditions.temp - 32) * (5/9)))+ "°C" : "";
    const degree_f = weatherData2 && weatherData && weatherData.current? String(Math.ceil(weatherData2.currentConditions.temp))+ "°F" : "";
    const uv_index = weatherData && weatherData.current ? String(weatherData.current.uv) + " UV" : "";
    const wind = weatherData && weatherData.current ? String(weatherData.current.wind_kph) + " kph" : "";
    const humidity = weatherData && weatherData.current ? String(weatherData.current.humidity) + "%" : "";

    const locations = weatherData && weatherData.current? String(weatherData.location.name) + ", " + String(weatherData.location.country) : "";
    const [time, setTime] = useState("");
    
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
    setInterval(updateTime, 1000);
    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    
    const[info, setInfo] = useState(false);

    function displayInfo() {
        setInfo(true);
        setTimeout(() => setInfo(false), 1000);
    }

    return(
        <div className='comp-display'>
            <div className="display">
                <div className="display-wrapped">
                    <img className='display-image' src='src/assets/react.svg'></img>
                    <img className='display-info icon' src='src/assets/ICONS/ICON-INFO.svg' onClick={displayInfo}></img>
                    <div className="display-time">{time}</div>
                    <div className="display-degree">{toCelcius? degree_c: degree_f}</div>
                    <div className="display-content">
                        <div className="display-city">{locations}</div>
                        <div className="display-para">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et finibus mauris.
                        </div>
                    </div>
                    <div className="display-detail">
                        <div className="details-divide">
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src="src/assets/ICONS/ICON-TEMP.svg"></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? celcius? degree_f: degree_c :"Temperature"}</p>
                            </div>
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src="src/assets/ICONS/ICON-HUMID.svg"></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? humidity : "Humidity"}</p>
                            </div>
                        </div>
                        <div className="details-divide">
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src="src/assets/ICONS/ICON-UV.svg"></img>
                                </div>
                                <p onClick={displayInfo}>{!info ? uv_index : "UV-index"}</p>
                            </div>
                            <div className="details">
                                <div className="icon-container">
                                    <img className='icon' onClick={displayInfo} src="src/assets/ICONS/ICON-WIND.svg"></img>
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
    location: PropTypes.string.isRequired,
    celcius: PropTypes.bool.isRequired,
};
export default Display;