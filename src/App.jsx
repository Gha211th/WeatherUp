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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`,
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
    fetchDataByCity("blora");
  }, []);

  if (loading) {
    return <p>Load the datas from api..</p>;
  }

  const weatherCode = weather.current.weather_code;
  const { desc, icon } = getWeatherDetails(weatherCode);

  const currentTemp = Math.round(weather.current.temperature_2m);
  const feelsLikeTemp = Math.round(weather.current.apparent_temperature);
  const tempMax = Math.round(weather.daily.temperature_2m_max[0]);
  const tempMin = Math.round(weather.daily.temperature_2m_min[0]);
  const indexUv = Math.round(weather.daily.uv_index_max[0]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-blue-200">
      <NavbarComponent />
      <HeroCard
        cityName={cityName}
        temp={currentTemp}
        desc={desc}
        weatherId={icon}
        feelTemp={`Terasa seperti ${feelsLikeTemp} - Maks ${tempMax}° - Min ${tempMin}° - uv index: ${indexUv}`}
      />
    </div>
  );
}
