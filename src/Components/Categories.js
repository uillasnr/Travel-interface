import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import api from "../services/api";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get("/category");
        const { data } = response;
       
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  // Limitar o número de categorias exibidas
  const categoriesToShow = categories.slice(0, 4);

  return (
    <ScrollContainer className="flex gap-2 p-3 scroll-container sm:p-4 sm:gap-4 md:gap-6">
      {categoriesToShow.map((category, index) => (
        <Link
          to={`/categories/${category.id}`}
          key={index}
          style={{ textDecoration: "none" }}
        >
          <div
            className="relative w-[90px] h-[90px] transition-transform transform hover:scale-105
                  sm:w-[150px] sm:h-[150px]  md:w-[180px] lg:w-[220px] xl:w-[250px]"
          >
            <img
              className="rounded-lg object-cover w-[80px] h-[90px]  sm:w-[150px] sm:h-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px]"
              src={category.coverImage}
              alt={category.name}
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-sm sm:text-2xl font-bold rounded-lg">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
      
    </ScrollContainer>
  );
}

export default Categories;
