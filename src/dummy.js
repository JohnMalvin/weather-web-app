async function getWeatherData(location, hour) {
    // const apiKey = '838b65caf46d4b918db31334242810';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract necessary data for the specified hour from now
        const forecastHourIndex = new Date().getHours() + hour;
        const forecastData = data.forecast.forecastday[0].hour[forecastHourIndex-10];

        const weatherInfo = {
            location: data.location.name,
            region: data.location.region,
            country: data.location.country,
            temperatureC: forecastData.temp_c,
            temperatureF: forecastData.temp_f,
            condition: forecastData.condition.text,
            humidity: forecastData.humidity,
            windSpeedKph: forecastData.wind_kph,
            airQuality: data.current.air_quality // Current AQI, since hourly AQI might not be provided
        };

        console.log(weatherInfo);
        return weatherInfo;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function weatherDisplay(location, hour) {
    const weatherData = await getWeatherData(location, hour);
    if (weatherData) {
        document.getElementById("text").innerHTML = weatherData.temperatureC;
        document.getElementById("text2").innerHTML = weatherData.condition;
    } else {
        document.getElementById("text").innerHTML = "Invalid Input";
    }
}

// Call with both location and hour as parameters
weatherDisplay("Sydney", 5);
