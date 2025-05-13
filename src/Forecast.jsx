import { useEffect, useState } from 'react'
import './index.css'
import PropTypes from 'prop-types';


import REACT_ICON from './assets/react.svg'

function Forecast ({location, celcius}) {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] 
    const [weatherData, setWeatherData] = useState(null)
    const [weatherData2, setWeatherData2] = useState(null)
    const [calendar, setCalendar] = useState(["Today", "Tomorrow"])
    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                // let location = "Sydney"
                // console.log(location)
                let URL = `https://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=${location}&aqi=yes`
                let result = await fetch(URL);
                let json = await result.json();
                // console.log(json);
                setWeatherData(json)
                

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


                let day = new Date();
                day.setDate(day.getDate() + 2);
                let option = {weekday: 'long'};
                day = day.toLocaleDateString('en-US', option);

                let day2 = new Date();
                day2.setDate(day2.getDate() + 3);
                day2 = day2.toLocaleDateString('en-US', option);

                let day3 = new Date();
                day3.setDate(day3.getDate() + 4);
                day3 = day3.toLocaleDateString('en-US', option);

                if (calendar.length < 3) {
                    setCalendar([...calendar,  day, day2, day3]);
                    // console.log("afihweuifhiwehfhio")
                    // console.log(calendar)


                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [location])

    return(
        <div className='comp-forecast'>
            <div className="foreday-container">
                {weatherData && weatherData2? calendar.map((days, index) => {

                    let max_temp_f = String(Math.ceil(weatherData2.days[index].tempmax)); 
                    let min_temp_f = String(Math.floor(weatherData2.days[index].tempmin)); 
                        let min_temp_c = String(Math.floor((weatherData2.days[index].tempmin - 32) * (5/9) )); 
                        let max_temp_c = String(Math.ceil((weatherData2.days[index].tempmax - 32) * (5/9) )); 

                        let minmax_temp_c = min_temp_c + "°/" + max_temp_c + "°C";
                        let minmax_temp_f = min_temp_f + "°/" + max_temp_f + "°F";

                        let conditions = weatherData2.days[index].conditions;     
                        
                        

                    return(
                        <div className={index < 3 ?  "foreday-card": "foreday-card dontPreview"} key={days}>
                            <img src={REACT_ICON} className="foreday-image"></img>
                            <div className="foreday-date">{days}</div>
                            <div className="foreday-temp">{celcius? minmax_temp_c : minmax_temp_f}</div>
                            <div className="foreday-desc">{conditions}</div>
                        </div>

                    )
                } ) : null
                }
                
            </div>
            <div className="forecast-container">
                <div className="forecast-slider">
                    { weatherData && weatherData2? array.map((content, index) => {
                        let time = new Date()
                        let hour = time.getHours();
                        
                        let temp_celcius = (weatherData2.days[0].hours[(hour+index) %24].temp - 32) * (5/9);
                        if (temp_celcius - Math.floor(temp_celcius) > 0.4) {
                            temp_celcius = Math.ceil(temp_celcius);
                        } else {
                            temp_celcius = Math.floor(temp_celcius);
                        }
                        let temp_faren = weatherData2.days[0].hours[(hour+index) %24].temp;
                        if (temp_faren - Math.floor(temp_faren) > 0.4) {
                            temp_faren = Math.ceil(temp_faren);
                        } else {
                            temp_faren = Math.floor(temp_faren);
                        }
                        let condition= weatherData2.days[0].hours[(hour+index) %24].conditions;
                        
                        // let hour_index = (hour+index) %24; 
                        let local_time = weatherData.location.localtime;
                        local_time = local_time.slice(10, 13)
                        if (hour > local_time) {
                            let difference = hour-local_time;
                            hour = hour-difference; 
                        }
                        else if (hour < local_time) {
                            let difference = local_time - hour;
                            hour = hour + difference; 
                        }

                        temp_celcius = String(temp_celcius) + "°C";
                        temp_faren = String(temp_faren) + "°F";
                        hour = (hour+index) %24;
                        hour = hour < 10? "0" + String(hour) : String(hour);
                        return(
                            <div className="forecast-card-devide" key={content}>
                                <div className="forecast-card" >
                                    <div className="forecast-degree">{celcius? temp_celcius: temp_faren}</div>
                                    <img src={REACT_ICON} className='forecast-image'></img>
                                    <div className="forecast-data">
                                        <div className="forecast-desc">{condition}</div>
                                        <div className="forecast-time">{hour + ":00"}</div>
                                    </div>
                                </div>
                            </div>
                        )
                        }) : null
                    }
                    
                </div>
            </div>
        
        </div>
    )


}

Forecast.propTypes = {
    location: PropTypes.string.isRequired,
    celcius: PropTypes.bool.isRequired,
};
export default Forecast;
