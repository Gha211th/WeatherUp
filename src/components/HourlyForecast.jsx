import React from "react";
import { getWeatherDetails } from "../data/data_desc";

export default function HourlyForecast({
  hourlyData,
  aqiVal,
  aqiDesc,
  pm2_5Val,
  pm10_Val,
  ozoneVal,
}) {
  return (
    <div className="w-full flex flex-col xl:flex-row px-8 lg:px-15 xl:px-30 mt-5 gap-5">
      <div className="w-full bg-white p-5 rounded-lg border-2 border-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
        <h2 className="font-archivo font-bold text-xl text-black mb-4 uppercase tracking-wide">
          Perkiraan Cuaca
        </h2>

        <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-thin self-center pr-1">
          {hourlyData.map((item, index) => {
            const { icon } = getWeatherDetails(item.code);
            const isCurrent = index === 0;

            return (
              <div
                key={index}
                className={`flex shrink-0 w-28 py-4 px-2 rounded-lg border-2 border-black flex-col items-center justify-between gap-3 shadow-[5px_5px_0_0_rgb(0,0,0)] transition-all ${
                  isCurrent ? "bg-blue-600 text-white" : "bg-sky-200 text-black"
                }`}
              >
                <span className="font-spaceg font-bold text-sm">
                  {item.time}
                </span>

                <i className={`${icon} text-3xl`} />

                <span className="font-spaceg font-bold text-xl">
                  {item.temp}°
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full bg-sky-300 p-5 rounded-lg border-2 border-black shadow-[7px_7px_0_0_rgb(0,0,0)] mb-6">
        <h2 className="font-archivo font-bold text-xl text-black uppercase tracking-wide mb-4">
          Kualitas Udara
        </h2>
        <div className="flex justify-start items-end mb-4 gap-2">
          <h2 className="font-archivo font-bold text-7xl text-black uppercase tracking-wide">
            {aqiVal}
          </h2>
          <div className="bg-amber-300 w-fit h-fit shadow-[5px_5px_0_0_rgb(0,0,0)] outline-solid outline-2 outline-black rounded-md mb-4">
            <p className="font-spaceg font-semibold text-sm px-1 py-1">
              {aqiDesc}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3">
          <div className="flex flex-col w-full bg-white p-5 items-center justify-center outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] rounded-lg">
            <h2 className="font-spaceg font-medium text-lg h-5">PM2.5</h2>
            <p className="font-spaceg font-black text-2xl">{pm2_5Val}</p>
          </div>
          <div className="flex flex-col w-full bg-white p-5 items-center justify-center outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] rounded-lg">
            <h2 className="font-spaceg font-medium text-lg h-5">PM10</h2>
            <p className="font-spaceg font-black text-2xl">{pm10_Val}</p>
          </div>
          <div className="flex flex-col w-full bg-white p-5 items-center justify-center outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] rounded-lg">
            <h2 className="font-spaceg font-medium text-lg h-5">O₃</h2>
            <p className="font-spaceg font-black text-2xl">{ozoneVal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
