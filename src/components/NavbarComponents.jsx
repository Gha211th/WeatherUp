import React, { useState } from "react";

export default function NavbarComponent({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSeacrh = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative top-0 z-50  px-8 lg:px-40 xl:px-60 py-5 bg-blue-500 border-b-3 border-black outline-none">
      <div className="w-full h-auto flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <span className="bg-yellow-300 w-10 h-10 md:w-12 md:h-12 rounded-md outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] flex justify-center items-center">
            <i class="ri-sun-cloudy-line" style={{ fontSize: "1.8rem" }} />
          </span>
          <h1 className="font-archivo text-white text-2xl md:text-3xl">
            WeatherUp
          </h1>
        </div>
        <div>
          <form
            className="md:flex md:flex-row w-full bg-white py-1 px-4 items-center rounded-md outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] hidden"
            onSubmit={handleSubmit}
          >
            <i className="ri-search-line" style={{ fontSize: "1.4rem" }}></i>
            <input
              type="text"
              placeholder="cari Kota..."
              className="bg-white ml-3 py-2 items-center w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button
            onClick={toggleSeacrh}
            className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-md outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)] flex md:hidden justify-center items-center transition-colors duration-200"
          >
            <i
              className={isOpen ? "ri-close-line" : "ri-search-line"}
              style={{ fontSize: "1.5rem" }}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <form
          className="flex md:hidden flex-row w-full bg-white py-1 px-4 mt-5 items-center rounded-md outline-solid outline-2 outline-black shadow-[5px_5px_0_0_rgb(0,0,0)]"
          onSubmit={handleSubmit}
        >
          <i className="ri-search-line" style={{ fontSize: "1.4rem" }}></i>
          <input
            type="text"
            placeholder="cari Kota..."
            className="bg-white ml-3 py-2 items-center w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </form>
      )}
    </div>
  );
}
