import React, { use, useEffect, useState } from "react";

// Import component dari /components
import NavbarComponent from "./components/NavbarComponents";
import HeroCard from "./components/HeroCard";

//import utility from /utils
import { getWeatherDetails } from "./data/data_desc";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("jakarta");

  const fetchDataByCity = async (queryCity) => {
    try {
      setLoading(true);

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${queryCity}&count=10&language=en&format=json`,
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("nama kota tidak ditemukan");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      setCityName(`${name}, ${country || ""}`);

      const weatherResponses = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,pressure_msl&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`,
      );

      if (!weatherResponses.ok) {
        throw new Error("failed to fetch data from open meteo API");
      }

      const weatherData = await weatherResponses.json();
      setWeather(weatherData);
    } catch (e) {
      console.log(`failed to fetch data ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataByCity("jakarta");
  }, []);

  if (loading || !weather) {
    return <p>Load the datas from api..</p>;
  }

  const weatherCode = weather.current.weather_code;
  const { desc, icon } = getWeatherDetails(weatherCode);

  const currentTemp = Math.round(weather.current.temperature_2m);
  const feelsLikeTemp = Math.round(weather.current.apparent_temperature);
  const tempMax = Math.round(weather.daily.temperature_2m_max[0]);
  const tempMin = Math.round(weather.daily.temperature_2m_min[0]);
  const indexUv = Math.round(weather.daily.uv_index_max[0]);
  const windSpeed = Math.round(weather.current.wind_speed_10m);
  const humidity = Math.round(weather.current.relative_humidity_2m);
  const pressure = Math.round(weather.current.pressure_msl);

  const getUvDesc = (val) => {
    if (val <= 2) return "Rendah";
    if (val <= 5) return "Sedang";
    if (val <= 7) return "Tinggi";
    if (val <= 10) return "Sangat Tinggi";
    if (val >= 11) return "Extreme";
  };

  const getWindSpeedDesc = (val) => {
    if (val <= 10) return "Angin Ringan";
    if (val <= 30) return "Angin Sedang";
    if (val <= 60) return "Angin Kuat";
    j;
  };

  const getHumidityDesc = (val) => {
    if (val <= 39) return "Terlalu Kering";
    if (val <= 60) return "Ideal / Sehat";
    if (val >= 61) return "Terlalu lembab";
  };

  const getPressureDesc = (val) => {
    if (val <= 1000) return "Rendah (potensi hujan & badai)";
    if (val <= 1020) return "Normal (stabil)";
    return "Tinggi (Cerah & Stabil)";
  };

  const getBarUvWidth = Math.min((indexUv / 12) * 100, 100);

  return (
    <div className="w-full min-h-screen flex flex-col bg-blue-200">
      <NavbarComponent onSearch={fetchDataByCity} />
      <HeroCard
        cityName={cityName}
        temp={currentTemp}
        desc={desc}
        weatherId={icon}
        feelTemp={`Terasa seperti ${feelsLikeTemp} - Maks ${tempMax}° - Min ${tempMin}°`}
        uvIndex={indexUv}
        widthUV={`${getBarUvWidth}%`}
        descUV={getUvDesc(indexUv)}
        windSpeed={windSpeed}
        humidity={humidity}
        pressure={pressure}
        descWind={getWindSpeedDesc(windSpeed)}
        descHumidity={getHumidityDesc(humidity)}
        descPressure={getPressureDesc(pressure)}
      />
    </div>
  );
}
