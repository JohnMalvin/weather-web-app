export const weatherCodeConditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
};
export const weatherCodeDescriptions = {
    0: "The sky is completely clear with no clouds visible.",
    1: "Mostly clear skies with only a few clouds scattered around.",
    2: "A mix of sun and clouds, with partly cloudy conditions.",
    3: "The sky is fully covered by clouds, making it overcast.",
    45: "Fog is present, reducing visibility significantly.",
    48: "Rime fog deposits frost on surfaces in cold conditions.",
    51: "Light drizzle causing a fine, misty rain.",
    53: "Moderate drizzle with steady light rain.",
    55: "Dense drizzle leading to continuous light rain.",
    56: "Light freezing drizzle causing icy surfaces.",
    57: "Dense freezing drizzle resulting in icy rain conditions.",
    61: "Slight rain falling lightly over the area.",
    63: "Moderate rain with steady showers.",
    65: "Heavy rain causing wet and potentially hazardous conditions.",
    66: "Light freezing rain creating slippery conditions.",
    67: "Heavy freezing rain leading to dangerous icy surfaces.",
    71: "Light snowfall gently covering the ground.",
    73: "Moderate snowfall accumulating steadily.",
    75: "Heavy snowfall creating difficult travel conditions.",
    77: "Snow grains falling lightly and softly.",
    80: "Light rain showers coming and going intermittently.",
    81: "Moderate rain showers falling at intervals.",
    82: "Violent rain showers with heavy bursts.",
    85: "Light snow showers falling sporadically.",
    86: "Heavy snow showers creating rapid accumulation.",
    95: "A thunderstorm with lightning and thunder activity.",
    96: "Thunderstorm accompanied by slight hail.",
    99: "Severe thunderstorm with heavy hail causing damage.",
};
const weatherCodeImages = {
    0: "https://openweathermap.org/img/wn/01d.png",
    1: "https://openweathermap.org/img/wn/02d.png",
    2: "https://openweathermap.org/img/wn/03d.png",
    3: "https://openweathermap.org/img/wn/04d.png",
    45: "https://openweathermap.org/img/wn/50d.png",
    48: "https://openweathermap.org/img/wn/50d.png",
    51: "https://openweathermap.org/img/wn/09d.png",
    53: "https://openweathermap.org/img/wn/09d.png",
    55: "https://openweathermap.org/img/wn/09d.png",
    56: "https://openweathermap.org/img/wn/13d.png",
    57: "https://openweathermap.org/img/wn/13d.png",
    61: "https://openweathermap.org/img/wn/10d.png",
    63: "https://openweathermap.org/img/wn/10d.png",
    65: "https://openweathermap.org/img/wn/10d.png",
    66: "https://openweathermap.org/img/wn/13d.png",
    67: "https://openweathermap.org/img/wn/13d.png",
    71: "https://openweathermap.org/img/wn/13d.png",
    73: "https://openweathermap.org/img/wn/13d.png",
    75: "https://openweathermap.org/img/wn/13d.png",
    77: "https://openweathermap.org/img/wn/13d.png",
    80: "https://openweathermap.org/img/wn/09d.png",
    81: "https://openweathermap.org/img/wn/09d.png",
    82: "https://openweathermap.org/img/wn/11d.png",
    85: "https://openweathermap.org/img/wn/13d.png",
    86: "https://openweathermap.org/img/wn/13d.png",
    95: "https://openweathermap.org/img/wn/11d.png",
    96: "https://openweathermap.org/img/wn/11d.png",
    99: "https://openweathermap.org/img/wn/11d.png",
};
  
export const getWeatherData = async (cityName, dayOffset, hourOffset, isFahrenheit = false) => {
    try {
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
    );
    if (!geoRes.ok) throw new Error("Geocoding failed");
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
    }

    const { latitude, longitude, timezone, name, country } = geoData.results[0];

    const now = new Date();
    const target = new Date(now);
    target.setDate(now.getDate() + dayOffset);
    const currentHour = now.getHours();
    target.setHours(currentHour + hourOffset, 0, 0, 0);

    const day = target.toISOString().split("T")[0];
    const hourStr = target.getHours().toString().padStart(2, "0");
    const targetDateTime = `${day}T${hourStr}:00`;

    // Fetch regular weather
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&hourly=temperature_2m,weathercode,relativehumidity_2m,uv_index,windspeed_10m&forecast_days=7&timezone=${timezone}`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("Weather fetch failed");
    const weatherJson = await weatherRes.json();

    const timeIndex = weatherJson.hourly.time.indexOf(targetDateTime);
    if (timeIndex === -1) {
        throw new Error("Requested day/hour not available in data");
    }

    let temperature = weatherJson.hourly.temperature_2m[timeIndex];
    const weatherCode = weatherJson.hourly.weathercode[timeIndex];
    const humidity = weatherJson.hourly.relativehumidity_2m[timeIndex];
    const uvIndex = weatherJson.hourly.uv_index[timeIndex];
    const windspeed = weatherJson.hourly.windspeed_10m[timeIndex];
    const condition = weatherCodeConditions[weatherCode] || "Unknown";
    const description = weatherCodeDescriptions[weatherCode] || "Unknown";
    const image = weatherCodeImages[weatherCode] || "Unknown";

    if (isFahrenheit) {
        temperature = (temperature * 9) / 5 + 32;
    }

    const airRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}` +
        `&hourly=pm10,pm2_5,european_aqi&timezone=${timezone}`
    );
    if (!airRes.ok) throw new Error("Air quality fetch failed");
    const airJson = await airRes.json();

    const airIndex = airJson.hourly.time.indexOf(targetDateTime);
    const airQuality = airIndex !== -1
        ? {
            pm10: airJson.hourly.pm10[airIndex],
            pm2_5: airJson.hourly.pm2_5[airIndex],
            european_aqi: airJson.hourly.european_aqi[airIndex]
          }
        : null;
  
    return {
        location: {
            city: name,
            country,
            latitude,
            longitude,
            timezone,
        },
        datetime: `${hourStr}:00`,
        temperature,
        humidity,
        uvIndex,
        windspeed,
        condition,
        description,
        airQuality,
        image
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Unknown error");
    }
  };
  