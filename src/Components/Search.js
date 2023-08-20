import React from "react";


function Search() {
    return (
      <div className="w-full flex gap-8 justify-between px-4 bg-teal-700 rounded-2xl h-24 items-center text-white text-base backdrop-blur-sm">
        <div className="flex place-content-center">
          <img className="w-5 h-5 mr-2" src="assets/icon-search.svg" alt="" />
          <input
            className="
            border-none
            bg-white
            outline-none
            rounded-lg
            text-center
            text-slate-700
            h-8
            w-80
            "
            type="search"
            placeholder="Onde você quer ir?"
          />
        </div>
        <div className="flex">
          <div className="flex">
            <img className="mr-2" src="./assets/calendar.svg" alt="" />
            <input
              className="border-none outline-none bg-white appearance-none text-center text-slate-700 h-8 rounded-lg"
              type="date"
              placeholder="Data Inicio"
              name="Check in"
              id=""
            />
          </div>
          <div className="flex">
            <img className="mr-2" src="./assets/calendar.svg" alt="" />
            <input
              className="
            border-none 
            outline-none 
            bg-white
            text-slate-700
            text-center
            rounded-lg
            h-8
            appearance-none "
              type="date"
              placeholder="Data Final"
              name="Check out"
            />
          </div>
        </div>
        <div className="flex">
          <img className="mr-2" src="./assets/person.svg" alt="" />
  
       
        </div>
        <button className="bg-white rounded-[32px] w-36 h-8 text-indigo-600 font-bold">
          Search
        </button>
      </div>
    );
  }
  
  export default Search;