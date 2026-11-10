import React from "react";
import { getWeatherDetails } from "../data/data_desc";

export default function HourlyForecast({
  hourlyData,
  aqiVal,
  aqiDesc,
  pm2_5Val,
  pm10_Val,
  ozoneVal,
  airDesc,
}) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 px-8 lg:px-15 xl:px-30 mt-5 gap-y-5 gap-x-0 lg:gap-x-5 lg:gap-y-0">
      <div className="w-full h-fit col-span-2 bg-white p-5.5 rounded-4xl shadow-sm hover:shadow-lg hover:scale-101 cursor-pointer transition-all duration-300">
        <h2 className="font-plus-jakarta-sans font-medium text-xl text-black mb-4 tracking-wide">
          Perkiraan Cuaca
        </h2>

        <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-thin self-center pr-1">
          {hourlyData.map((item, index) => {
            const { icon } = getWeatherDetails(item.code);
            const isCurrent = index === 0;

            return (
              <div
                key={index}
                className={`flex shrink-0 w-28 py-5 px-2 rounded-4xl flex-col items-center justify-between gap-2 transition-all ${
                  isCurrent ? "bg-sky-600 text-white" : "bg-sky-50"
                }`}
              >
                <span
                  className={`font-plus-jakarta-sans font-normal text-md ${isCurrent ? "text-white" : "text-gray-600"}`}
                >
                  {item.time}
                </span>

                <i
                  className={`${icon} text-4xl ${isCurrent ? "text-white" : "text-sky-600"}`}
                />

                <span className="font-plus-jakarta-sans font-medium text-xl">
                  {item.temp}°
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full col-span-1 bg-white shadow-sm hover:shadow-lg hover:scale-101 cursor-point transition-all duration-300 p-5 rounded-4xl mb-6">
        <div className="w-full flex flex-row">
          <h2 className="font-plus-jakarta-sans font-medium text-xl text-black mb-4 tracking-wide">
            Kualitas Udara
          </h2>
          <div className="">
            <p className="px-2 py-1 font-plus-jakarta-sans font-normal text-white">
              {airDesc}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 grid-rows-2 gap-2">
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="w-full h-fit p-2.5 flex flex-col gap-1 justify-center items-center bg-sky-50 rounded-2xl">
              <p className="font-plus-jakarta-sans font-medium text-md text-gray-600">
                AQI
              </p>
              <h1 className="font-plus-jakarta-sans font-semibold text-black/90 text-xl">
                {aqiVal}
              </h1>
            </div>
            <div className="w-full h-fit p-2.5 flex flex-col gap-1 justify-center items-center bg-sky-50 rounded-2xl">
              <p className="font-plus-jakarta-sans font-medium text-md text-gray-600">
                PM2.5
              </p>
              <h1 className="font-plus-jakarta-sans font-semibold text-black/90 text-xl">
                {pm2_5Val}
              </h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="w-full h-fit p-2.5 flex flex-col gap-1 justify-center items-center bg-sky-50 rounded-2xl">
              <p className="font-plus-jakarta-sans font-medium text-md text-gray-600">
                PM10
              </p>
              <h1 className="font-plus-jakarta-sans font-semibold text-black/90 text-xl">
                {pm10_Val}
              </h1>
            </div>
            <div className="w-full h-fit p-2.5 flex flex-col gap-1 justify-center items-center bg-sky-50 rounded-2xl">
              <p className="font-plus-jakarta-sans font-medium text-md text-gray-600">
                O₃
              </p>
              <h1 className="font-plus-jakarta-sans font-semibold text-black/90 text-xl">
                {ozoneVal}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
