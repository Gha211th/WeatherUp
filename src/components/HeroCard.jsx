import { useNavigate } from "react-router-dom";

export default function HeroCard({
  cityName,
  temp,
  desc,
  weatherId,
  feelTemp,
  uvIndex,
  windSpeed,
  humidity,
  pressure,
}) {
  const navigate = useNavigate();
  const handleDetailTrigger = (e) => {
    e.preventDefault();
    navigate("/detail", {
      state: {
        cityName,
        temp,
        desc,
        uvIndex,
        windSpeed,
        humidity,
        pressure,
        weatherId,
      },
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-y-5 gap-x-0 lg:gap-x-5 lg:gap-y-0 px-8 lg:px-15 xl:px-30">
      <div
        className="w-full h-full lg:col-span-3 row-span-1 bg-sky-600 flex flex-col justify-center p-8 lg:p-10 rounded-4xl shadow-sm hover:shadow-lg hover:scale-101 cursor-pointer transition-all duration-300"
        onClick={handleDetailTrigger}
      >
        <div className="w-full flex flex-row items-center gap-1">
          <i className="ri-map-pin-line text-white"></i>
          <h3 className="text-white font-plus-jakarta-sans text-sm lg:text-lg">
            Kota {cityName}
          </h3>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            <h1 className="font-plus-jakarta-sans text-white font-normal text-8xl md:text-9xl">
              {temp}°
            </h1>
            <p className="mt-3 font-plus-jakarta-sans font-medium text-white">
              {desc}
            </p>
          </div>
          <i
            className={`${weatherId} text-white text-8xl md:text-9xl animate-float`}
          />
        </div>
        <p className="font-plus-jakarta-sans font-medium text-white text-xs lg:text-[1rem]">
          {feelTemp}
        </p>
      </div>
      <div className="w-full bg-white grid col-span-2 rounded-4xl p-5 shadow-sm hover:shadow-lg hover:scale-101 cursor-pointer transition-all duration-300">
        <h1 className="font-plus-jakarta-sans text-black font-medium text-xl mb-4">
          Detail Cuaca Hari
        </h1>
        <div className="w-full bg-transparent grid grid-rows-2 gap-3">
          <div className="w-full bg-transparent grid grid-cols-2 gap-3">
            <div className="w-full bg-sky-50 p-5 rounded-xl">
              <div className="w-fit bg-sky-200 flex rounded-full mb-2">
                <i className="ri-drop-line px-3 py-2 text-xl text-blue-700"></i>
              </div>
              <h1 className="font-plus-jakarta-sans text-gray-500 font-normal mb-3">
                Kelembapan
              </h1>
              <h4 className="font-plus-jakarta-sans text-black/90 font-medium text-2xl">
                {humidity}%
              </h4>
            </div>
            <div className="w-full bg-sky-50 p-5 rounded-xl">
              <div className="w-fit bg-sky-200 flex rounded-full mb-2">
                <i className="ri-windy-line px-3 py-2 text-xl text-blue-700"></i>
              </div>
              <h1 className="font-plus-jakarta-sans text-gray-500 font-normal mb-3">
                Angin
              </h1>
              <h4 className="font-plus-jakarta-sans text-black/90 font-medium text-2xl">
                {windSpeed} Km/j
              </h4>
            </div>
          </div>
          <div className="w-full bg-transparent grid grid-cols-2 gap-3">
            <div className="w-full bg-sky-50 p-5 rounded-xl">
              <div className="w-fit bg-sky-200 flex rounded-full mb-2">
                <i className="ri-sun-line px-3 py-2 text-xl text-blue-700"></i>
              </div>
              <h1 className="font-plus-jakarta-sans text-gray-500 font-normal mb-3">
                Indeks UV
              </h1>
              <h4 className="font-plus-jakarta-sans text-black/90 font-medium text-2xl">
                {uvIndex}
              </h4>
            </div>
            <div className="w-full bg-sky-50 p-5 rounded-xl">
              <div className="w-fit bg-sky-200 flex rounded-full mb-2">
                <i className="ri-speed-up-line px-3 py-2 text-xl text-blue-700"></i>
              </div>
              <h1 className="font-plus-jakarta-sans text-gray-500 font-normal mb-3">
                Tekanan
              </h1>
              <h4 className="font-plus-jakarta-sans text-black/90 font-medium text-2xl">
                {pressure} hPa
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
