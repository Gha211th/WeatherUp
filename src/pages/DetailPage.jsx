import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DetailPage({
  cityName,
  countryName,
  maxTemp,
  minTemp,
  descHumidity,
  descWind,
  descUV,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const weatherState = location.state || {};
  const { temp, desc, uvIndex, windSpeed, humidity, weatherId } = weatherState;
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between items-center bg-sky-500">
      <div className="w-full flex flex-col items-center mt-7">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-fit bg-white/20 flex justify-center items-center px-3 py-2 text-white font-plus-jakarta-sans font-medium rounded-4xl hover:scale-105 cursor-pointer transition-all duration-300"
        >
          <i className="ri-arrow-left-line text-2xl pl-2"></i>{" "}
          <p className="pr-2">Kembali ke Dashboard</p>
        </button>
      </div>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mb-10">
          <h4 className="font-plus-jakarta-sans font-semibold text-3xl lg:text-5xl text-white">
            {cityName || "Kota tidak ditemukan"}
          </h4>
          <p className="font-plus-jakarta-sans font-normal text-white text-sm lg:text-xl">
            {countryName}
          </p>
        </div>
        <i
          className={`${weatherId || "ri-sun-line animate-float"} text-white text-9xl md:text-9xl animate-float mb-5`}
        />
        <h1 className="font-plus-jakarta-sans font-light text-8xl text-white tracking-tighter">
          {temp}°
        </h1>
        <p className="font-plus-jakarta-sans font-medium text-white text-2xl lg:text-3xl mt-7">
          {desc}
        </p>
        <span className="font-plus-jakarta-sans font-light text-white text-md lg:text-lg">
          tertinggi {maxTemp}° - terendah {minTemp}°
        </span>
      </div>
      <div className="w-fit flex flex-row gap-15 bg-white/30 mb-5 lg:mb-10 px-10 py-5 rounded-4xl mx-5 hover:scale-105 cursor-pointer transition-all duration-300">
        <div className="w-full flex flex-col justify-center items-center">
          <i className="ri-drop-line text-2xl text-white"></i>
          <p className="font-plus-jakarta-sans font-medium text-white text-lg">
            {humidity}%
          </p>
          <p className="font-plus-jakarta-sans font-light text-md text-white">
            {descHumidity}
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <i className="ri-windy-line text-2xl text-white"></i>
          <p className="font-plus-jakarta-sans font-medium text-white text-lg">
            {windSpeed}km/j
          </p>
          <p className="font-plus-jakarta-sans font-light text-md text-white">
            {descWind}
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <i className="ri-sun-line text-2xl text-white"></i>
          <p className="font-plus-jakarta-sans font-medium text-white text-lg">
            {uvIndex}%
          </p>
          <p className="font-plus-jakarta-sans font-light text-md text-white">
            {descUV}
          </p>
        </div>
      </div>
    </div>
  );
}
