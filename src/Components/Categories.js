import React, { useEffect, useState } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'
import api from "../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('Trips');
        const { data } = response;
        console.log(data);

        // Filtrar apenas as categorias recomendadas
        const recommendedCategories = data.filter(category => category.recommended === true);

        setCategories(recommendedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  // Limitar o número de categorias exibidas
  const categoriesToShow = categories.slice(0, 4);

  return (
    <ScrollContainer className="flex gap-6">
      {categoriesToShow &&
        categoriesToShow.map((category) => (
          <div
            className="relative h-[200px] w-[250px]"
            key={category.id}>
            <img
              className="rounded-lg object-cover"
              src={category.coverImage}
              alt={category.name}
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded-lg">
              {category.name}
            </p>
          </div>
        ))}
    </ScrollContainer>
  );
}

export default Categories;
