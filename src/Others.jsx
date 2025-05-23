import './index.css'
// import './component.css'
import { useEffect, useState } from 'react';
import OthersTemplate from './TEMPLATE/OthersTemplate';
import PropTypes from 'prop-types';
import SPINNER from "./assets/SPINNER.svg";


// import REACT_ICON from './assets/react.svg'
import ICON_HUMID from './assets/ICONS/ICON-HUMID.svg'
import ICON_WIND from './assets/ICONS/ICON-WIND.svg'
import ICON_UV from './assets/ICONS/ICON-UV.svg'
import { getOthersWeatherData } from './CLIENT_HELPER.JS';
import { updateCities } from './CLIENT_HELPER.JS';

function Others({ cities, celcius , locationData, setLocationData, setCities, loading}) {
    const [data, setData] = useState([]);
    const [othersLoading, setOthersLoading] = useState(true);
    useEffect(() => {
        let ignore = false;
        const fetchWeather = async () => {
            try {
                if (ignore) return;
                const weather = await getOthersWeatherData(cities);
                // console.log(weather);
                setData(weather);
                setOthersLoading(false);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
        return () => { ignore = true; };
    }, [locationData, cities, loading]);

    useEffect(() => {
        if (loading === true) {
            setOthersLoading(true);
        } else {
            setOthersLoading(false);
        }
    }, [loading]);
    
    return(
        <div className='comp-others'>
            <div className="others-container others">
                {othersLoading ? (
                    <>
                        <OthersTemplate />
                        <OthersTemplate />
                        <OthersTemplate />
                    </>
                ) : (
                    data.map((city) => {
                    const degree_c = Math.round(city.temperature) + "°C";
                    const degree_f = Math.round((city.temperature * 9) / 5 + 32) + "°F";
                    const uv_index = city.uvIndex + " UV";
                    const wind = city.windspeed + " km/h";
                    const humidity = city.humidity + "%";
                    const city_name = city.city;
                    const target_location = `${city.city}, ${city.country}`;
                    const image = city.image;
                    return (
                    <div className="others-card" key={target_location} onClick={() => {
                        setLocationData(city_name);
                        setCities(updateCities(locationData, cities, city_name));
                    }}>
                        <div className="others-degree">{celcius? degree_c : degree_f}</div>
                        <div className="others-data">
                            <div className="others-location hide-on-desktop">{target_location}</div>
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
                            <img src={othersLoading ? SPINNER : image} className='others-image'></img>
                        </div>
                        
                    </div>
                    )})
                )}

            </div>
        </div>
    )
}

Others.propTypes = {
    locationData: PropTypes.string.isRequired,
    celcius: PropTypes.bool.isRequired,
    cities: PropTypes.array.isRequired,
    setCities: PropTypes.func.isRequired,
    setLocationData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default Others;