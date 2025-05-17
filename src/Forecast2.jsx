import { useEffect, useState } from 'react'
import './index.css'
import PropTypes from 'prop-types';
import SPINNER from "./assets/SPINNER.svg";


// import REACT_ICON from './assets/react.svg'
import { getFullWeekWeatherData } from './CLIENT_HELPER.JS';
import { getFullDayWeatherData } from './CLIENT_HELPER.JS';
import ForeDayTemplate from './TEMPLATE/ForeDayTemplate';
import ForeCastTemplate from './TEMPLATE/ForeCastTemplate';

function Forecast({ locationData, celciusData, loading, setLoading }) {
    const [dayData, setDayData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [foreDayLoading, setForeDayLoading] = useState(true);
    const [foreCastLoading, setForeCastLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            setForeDayLoading(true);
            setForeCastLoading(true);
        };
    }, [loading]);
    useEffect(() => { 
        let ignore = false;
        const fetchWeather = async () => {
        if (ignore) return;
            try {
                const data = await getFullWeekWeatherData(locationData);
                console.log("Full Week Weather Data:", data);
                setWeekData(data);
                setForeDayLoading(false);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
        return () => { ignore = true; };
    }, [locationData, celciusData]);

    useEffect(() => { 
        let ignore = false;
        const fetchWeather = async () => {
            if (ignore) return;
            try {
                const data = await getFullDayWeatherData(locationData);
                console.log("Full Day Weather Data:", data);
                setDayData(data);
                setForeCastLoading(false);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
        return () => { ignore = true; };
    }, [locationData, celciusData]);
    
 
    return(
        <div className='comp-forecast'>
            <div className="foreday-container">
                {foreDayLoading ? (
                    <>
                        <ForeDayTemplate />
                        <ForeDayTemplate />
                        <ForeDayTemplate />
                        <ForeDayTemplate />
                        <ForeDayTemplate />
                    </>
                ) : (
                    weekData.map((days, index) => {
                        const condition = days.condition;
                        const date = days.date;
                        const image = days.image;

                        const max_temp_c = String(Math.ceil(days.temperatureMax));
                        const max_temp_f = String(Math.ceil(days.temperatureMax * 9 / 5 + 32));
                        const min_temp_c = String(Math.floor(days.temperatureMin));
                        const min_temp_f = String(Math.floor(days.temperatureMin * 9 / 5 + 32));

                        const minmax_temp_c = min_temp_c + "°/" + max_temp_c + "°C";
                        const minmax_temp_f = min_temp_f + "°/" + max_temp_f + "°F";

                        return(
                            <div className={"foreday-card"} key={days + index}>
                                <img src={foreDayLoading ? SPINNER: image} className="foreday-image"></img>
                                <div className="foreday-date">{date ? date : "loading"}</div>
                                <div className="foreday-temp">{celciusData ? minmax_temp_c : minmax_temp_f}</div>
                                <div className="foreday-desc">{condition}</div>
                            </div>

                        )
                    }
                ))}

            </div>
            <div className="forecast-container">
                <div className="forecast-slider">
                    { foreCastLoading ? (
                        <>
                            <ForeCastTemplate />
                            <ForeCastTemplate />
                            <ForeCastTemplate />
                            <ForeCastTemplate />
                            <ForeCastTemplate />
                        </>
                    ) : (
                        dayData && dayData.map((hours, index) => {

                        const temp_celcius = Math.ceil(hours.temperature) + "°C";
                        const temp_faren = Math.ceil((hours.temperature * 9 / 5) + 32) + "°F";

                        const time = hours.time;
                        const condition = hours.condition;
                        const image = hours.image;

                        return(
                            <div className="forecast-card-devide" key={hours + index}>
                                <div className="forecast-card" >
                                    <div className="forecast-degree">{celciusData? temp_celcius: temp_faren}</div>
                                    <img src={foreCastLoading ? SPINNER : image} className='forecast-image'></img>
                                    <div className="forecast-data">
                                        <div className="forecast-desc">{condition}</div>
                                        <div className="forecast-time">{time}</div>
                                    </div>
                                </div>
                            </div>
                        )
                        })
                    )}
                    
                </div>
            </div>
        
        </div>
    )


}

Forecast.propTypes = {
    locationData: PropTypes.string.isRequired,
    celciusData: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};
export default Forecast;
