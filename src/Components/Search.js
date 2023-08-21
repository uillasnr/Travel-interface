import React from "react";
import { FiSearch } from "react-icons/fi"

function Search() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 justify-between px-4 bg-white rounded-2xl h-auto sm:h-24 items-center text-white text-base backdrop-blur-sm">
      <div className="flex place-content-center items-center justify-center">
        <FiSearch size={20} className="text-gray-700 flex mr-2" />
        <input
          className="
          border-none
          bg-slate-300
          outline-none
          rounded-lg
          text-center
          text-slate-700
          h-8
          sm:w-46   //mobile
          md:w-48   // Width for medium screens
          lg:w-80   // Width for large screens
          w-full
          "
          type="search"
          placeholder="Onde você quer ir?"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center">

          <input
            className="border-none outline-none bg-slate-300 appearance-none text-center text-slate-700 h-8 rounded-lg"
            type="date"
            placeholder="Data Inicio"
            name="Check in"
            id=""
          />
        </div>
        <div className="flex items-center">

          <input
            className="
              border-none 
              outline-none 
              bg-slate-300
              text-slate-700
              text-center
              rounded-lg
              h-8
              appearance-none
            "
            type="date"
            placeholder="Data Final"
            name="Check out"
          />
        </div>
      </div>
      <div className="flex">

      </div>
      <button className="bg-cyan-700 rounded-[32px] w-36 h-8 text-white font-bold">
        Search
      </button>
    </div>
  );
}

export default Search;
