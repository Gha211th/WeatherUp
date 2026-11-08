import React, { useState } from "react";

export default function NavbarComponent({ onSearch, dateFormat }) {
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
    <div className="w-full relative top-0 z-50 justify-between bg-transparent px-8 lg:px-15 xl:px-30 pt-8 pb-3 mb-5">
      <div className="w-full h-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full flex flex-col gap-1 mb-4">
          <p className="font-plus-jakarta-sans font-medium text-gray-400">
            {dateFormat}
          </p>
          <h1 className="font-plus-jakarta-sans font-semibold text-2xl md:text-3xl">
            Howdy, How are you👋
          </h1>
        </div>
        <div className="w-full">
          <form
            className="w-full md:w-80 lg:w-100 xl:w-150 flex flex-row items-center bg-white border border-gray-200 rounded-full py-2.5 px-4 shadow-sm hover:shadow-md transition-all"
            onSubmit={handleSubmit}
          >
            <i className="ri-search-line text-gray-400 text-xl"></i>
            <input
              type="text"
              placeholder="Cari Kota, mis. Bandung"
              className="w-full bg-transparent ml-3 outline-none text-gray-700 placeholder-gray-400 text-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
