export default function HeroCard({
  cityName,
  temp,
  desc,
  weatherId,
  feelTemp,
}) {
  const d = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = d.toLocaleDateString("id-ID", options);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 px-10 lg:px-40 xl:px-55 mt-10">
      <div className="w-full lg:col-span-2 bg-blue-950 flex flex-col p-10 rounded-lg outline-solid outline-2 outline-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
        <div className="w-full flex flex-row items-center gap-1">
          <i className="ri-map-pin-line text-white"></i>
          <h3 className="text-white font-spaceg font-bold text-sm lg:text-lg">
            Kota {cityName}
          </h3>
        </div>
        <p className="font-spaceg text-white font-normal text-sm lg:text-lg mb-2">
          {formattedDate}
        </p>
        <div className="w-full flex flex-row justify-between mb-2">
          <div>
            <h1 className="font-archivo text-white font-bold text-6xl md:text-9xl">
              {temp}°
            </h1>
            <div className="bg-amber-300 w-fit shadow-[5px_5px_0_0_rgb(0,0,0)] outline-solid outline-2 outline-black rounded-md">
              <p className="px-4 py-2 font-spaceg font-semibold text-sm lg:text-md">
                {desc}
              </p>
            </div>
          </div>
          <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-cyan-500 rounded-lg outline-solid outline-2 outline-black shadow-[10px_10px_0_0_rgb(0,0,0)]">
            <i className={`${iconClass} text-blue-950 text-6xl lg:text-7xl`} />
          </div>
        </div>
        <p className="font-spaceg font-semibold text-white text-xs lg:text-[1rem] pt-5">
          {feelTemp}
        </p>
      </div>
      <div className="w-full grid grid-rows-1 lg:grid-rows-2 gap-6">
        <div className="h-full w-full bg-white"></div>
        <div className="h-full w-full bg-white"></div>
      </div>
    </div>
  );
}
