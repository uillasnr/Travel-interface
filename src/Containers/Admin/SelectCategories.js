import React, { useEffect, useState } from "react";
import api from "../../services/api";

function SelectCategories({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a category");

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/category");
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div>
      <label
        htmlFor="Categorias"
        className="block text-gray-800 font-semibold mb-2"
      >
        Categorias:
      </label>
      <select
        id="categories"
        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
        value={selectedCategory} // Define o valor selecionado
        onChange={handleCategoryChange} // Manipulador de mudança para capturar seleções
      >
        <option value="Choose a category" disabled>
          Selecione a Categoria da viagem
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategories;
