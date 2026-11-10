import React, { use, useEffect, useState } from "react";

//import router & config
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Import component dari /components
import NavbarComponent from "./components/NavbarComponents";
import HeroCard from "./components/HeroCard";
import HourlyForecast from "./components/HourlyForecast";

//import utility from /utils
import { getWeatherDetails } from "./data/data_desc";

//import pages from /pages
import LoadingPage from "./pages/LoadingPage";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("jakarta");
  const [cityOnly, setCityOnly] = useState("jakarta");
  const [countryOnly, setCountryOnly] = useState("Indonesia");

  const fetchWeatherData = async (inputType) => {
    try {
      setLoading(true);
      let latitude, longitude;

      if (typeof inputType === "object" && inputType.lat && inputType.lon) {
        latitude = inputType.lat;
        longitude = inputType.lon;
        setCityName("lokasi terkini");
        setCityOnly("lokasi terkini");
        setCountryOnly("");
      } else {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${inputType}&count=10&language=en&format=json`,
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          alert("nama kota tidak ditemukan");
          setLoading(false);
          return;
        }

        const selectedLoc = geoData.results[0];
        latitude = selectedLoc.latitude;
        longitude = selectedLoc.longitude;

        setCityName(`${selectedLoc.name}, ${selectedLoc.country || ""}`);
        setCountryOnly(selectedLoc.country || "");
        setCityOnly(selectedLoc.name);
      }

      const [weatherRes, airQualityRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,pressure_msl&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`,
        ),
        fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,us_aqi,us_aqi_ozone`,
        ),
      ]);

      if (!weatherRes.ok) {
        throw new Error("failed to fetch data from open meteo API");
      }

      const weatherData = await weatherRes.json();
      const airQualityData = await airQualityRes.json();
      setWeather(weatherData);
      setAirQuality(airQualityData);
    } catch (e) {
      console.log(`failed to fetch data ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (e) => {
          alert(`failed to fetch location :( ${e}`);
          fetchWeatherData("jakarta");
        },
      );
    } else {
      fetchWeatherData("jakarta");
    }
  }, []);

  if (loading || !weather) {
    return <LoadingPage />;
  }

  const d = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = d.toLocaleDateString("id-ID", options);

  const currentISO = weather.current.time;
  const currentIndex = weather.hourly.time.findIndex((t) => t === currentISO);

  const startIndex = currentIndex !== -1 ? currentIndex : 0;
  const hourlyList = weather.hourly.time
    .slice(startIndex, startIndex + 10)
    .map((timeStr, index) => {
      const actualIndex = startIndex + index;
      const temp = Math.round(weather.hourly.temperature_2m[actualIndex]);
      const code = weather.hourly.weather_code[actualIndex];

      const formattedTime = index === 0 ? "kini" : timeStr.split("T")[1];

      return {
        time: formattedTime,
        temp,
        code,
      };
    });

  const weatherCode = weather.current.weather_code;
  const { desc, icon } = getWeatherDetails(weatherCode);

  //get weathers data
  const currentTemp = Math.round(weather.current.temperature_2m);
  const feelsLikeTemp = Math.round(weather.current.apparent_temperature);
  const tempMax = Math.round(weather.daily.temperature_2m_max[0]);
  const tempMin = Math.round(weather.daily.temperature_2m_min[0]);
  const indexUv = Math.round(weather.daily.uv_index_max[0]);
  const windSpeed = Math.round(weather.current.wind_speed_10m);
  const humidity = Math.round(weather.current.relative_humidity_2m);
  const pressure = Math.round(weather.current.pressure_msl);

  //get air quality datas
  const aqiValue = Math.round(airQuality?.current?.us_aqi ?? 0);
  const pm25Value = Math.round(airQuality?.current?.pm2_5 ?? 0);
  const pm10Value = Math.round(airQuality?.current?.pm10 ?? 0);
  const ozoneValue = Math.round(airQuality?.current?.us_aqi_ozone ?? 0);

  const getUvDesc = (val) => {
    if (val <= 2) return "Rendah";
    if (val <= 5) return "Sedang";
    if (val <= 7) return "Tinggi";
    if (val <= 10) return "Tinggi";
    if (val >= 11) return "Extreme";
  };

  const getWindSpeedDesc = (val) => {
    if (val <= 10) return "Ringan";
    if (val <= 30) return "Sedang";
    if (val <= 60) return "Kuat";
  };

  const getHumidityDesc = (val) => {
    if (val <= 39) return "Kering";
    if (val <= 60) return "Ideal";
    if (val >= 61) return "Lembab";
  };

  const getAqiDesc = (val) => {
    if (val <= 50) return "Baik (Sehat)";
    if (val <= 100) return "Sedang";
    if (val <= 150) return "Tidak Sehat bagi Kelompok Sensitif";
    if (val <= 200) return "Tidak Sehat";
    return "Sangat Tidak Sehat";
  };

  const getBarUvWidth = Math.min((indexUv / 12) * 100, 100);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F0F8FE]">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComponent
                onSearch={fetchWeatherData}
                dateFormat={formattedDate}
              />
              <HeroCard
                cityName={cityName}
                dateFormat={formattedDate}
                temp={currentTemp}
                desc={desc}
                weatherId={icon}
                feelTemp={`Terasa seperti ${feelsLikeTemp} - Maks ${tempMax}° - Min ${tempMin}°`}
                uvIndex={indexUv}
                widthUV={`${getBarUvWidth}%`}
                windSpeed={windSpeed}
                humidity={humidity}
                pressure={pressure}
              />
              <HourlyForecast
                hourlyData={hourlyList}
                aqiVal={aqiValue}
                pm2_5Val={pm25Value}
                pm10_Val={pm10Value}
                ozoneVal={ozoneValue}
                airDesc={getAqiDesc(aqiValue)}
              />
              <div className="w-full mt-auto">
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/detail"
          element={
            <DetailPage
              cityName={cityOnly}
              countryName={countryOnly}
              minTemp={tempMin}
              maxTemp={tempMax}
              descHumidity={getHumidityDesc(humidity)}
              descWind={getWindSpeedDesc(windSpeed)}
              descUV={getUvDesc(indexUv)}
            />
          }
        />
      </Routes>
    </div>
  );
}
