export default function HeroCard({
  cityName,
  temp,
  desc,
  weatherId,
  feelTemp,
  uvIndex,
  widthUV,
  descUV,
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
    <div className="w-full grid grid-cols-1 grid-rows-2 lg:grid-cols-5 gap-5 px-8 lg:px-40 xl:px-60 mt-10">
      <div className="w-full h-full lg:col-span-3 bg-blue-950 flex flex-col justify-center p-8 lg:p-10 rounded-lg outline-solid outline-3 outline-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
        <div className="w-full flex flex-row items-center gap-1">
          <i className="ri-map-pin-line text-white"></i>
          <h3 className="text-white font-spaceg font-bold text-sm lg:text-lg">
            Kota {cityName}
          </h3>
        </div>
        <p className="font-spaceg text-white font-normal text-sm lg:text-lg mb-2">
          {formattedDate}
        </p>
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            <h1 className="font-archivo text-white font-bold text-8xl md:text-9xl">
              {temp}°
            </h1>
            <div className="bg-amber-300 w-fit shadow-[5px_5px_0_0_rgb(0,0,0)] outline-solid outline-2 outline-black rounded-md">
              <p className="px-4 py-2 font-spaceg font-semibold text-[0.7rem] md:text-sm lg:text-md">
                {desc}
              </p>
            </div>
          </div>
          <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center bg-cyan-500 rounded-lg outline-solid outline-2 outline-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
            <i className={`${weatherId} text-blue-950 text-6xl lg:text-7xl`} />
          </div>
        </div>
        <p className="font-spaceg font-medium text-white text-xs lg:text-[1rem] pt-5">
          {feelTemp}
        </p>
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-1 col-span-2 lg:grid-rows-2 lg:grid-cols-1 gap-6">
        <div className="h-fit w-full bg-amber-300 rounded-lg outline-solid outline-2 outline-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
          <div className="flex flex-col justify-start p-5">
            <i className="ri-sun-line text-black text-2xl"></i>
            <h3 className="font-spaceg font-semibold text-lg">INDEKS UV</h3>
            <h2 className="font-spaceg font-bold text-4xl mb-2">{uvIndex}</h2>
            <div className="w-full h-2 mb-3 rounded-full bg-white outline-solid outline-2 outline-black shadow-[4px_4px_0_0_rgb(0,0,0)]">
              <div className="h-full bg-red-500" style={{ width: widthUV }} />
            </div>
            <p className="font-spaceg font-medium text-md">{descUV}</p>
          </div>
        </div>
        <div className="h-fit w-full bg-white rounded-lg outline-solid outline-2 outline-black shadow-[7px_7px_0_0_rgb(0,0,0)]">
          <div className="flex flex-col justify-start p-5">
            <i className="ri-sun-line text-black text-2xl"></i>
            <h3 className="font-spaceg font-semibold text-lg">INDEKS UV</h3>
            <h2 className="font-spaceg font-bold text-4xl mb-2">{uvIndex}</h2>
            <div className="w-full h-2 mb-3 rounded-full bg-white outline-solid outline-2 outline-black shadow-[4px_4px_0_0_rgb(0,0,0)]">
              <div className="h-full bg-red-500" style={{ width: widthUV }} />
            </div>
            <p className="font-spaceg font-medium text-md">{descUV}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto col-span-full bg-white">hello there</div>
    </div>
  );
}
