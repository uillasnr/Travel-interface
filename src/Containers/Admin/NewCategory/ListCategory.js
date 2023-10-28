import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";

function ListCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get("/category");
        const { data } = response;
        console.log("todas as categorias", data);
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <div>
      <h3 className="text-center text-gray-700 text-2xl mt-5 mb-5 font-bold">
        Todas as categorias
      </h3>
      <div className=" m-2 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
        <ScrollContainer className="flex gap-2 p-3 scroll-container sm:p-4 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/Update-category/${category.id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div
                className="relative w-[90px] h-[90px] transition-transform transform hover:scale-105 rounded-lg
                  sm:w-[150px] sm:h-[150px]  md:w-[180px] lg:w-[220px] xl:w-[250px]  xl:h-[220px] bg-opacity-80 bg-slate-500 hover:bg-slate-600
                  text-white"
              >
                <img
                  className="rounded-lg object-cover w-[80px] h-[90px]  sm:w-[150px] sm:h-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px]"
                  src={category.coverImage}
                  alt={category.name}
                />

                <div>
                  <p className="flex mt-2 items-center justify-center text-white text-lg font-bold rounded-lg">
                    {category.name}
                  </p>
                  <div className="text-white text-center mt-1 gap-2 justify-center font-bold flex items-center">
                    <RxUpdate size={15} color="white" />
                    <p className="flex  text-white text-sm font-bold ">
                      update
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}

export default ListCategories;
