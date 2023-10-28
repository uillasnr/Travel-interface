import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";
import InputFileCover from "../InputFileCover";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function UpdateCategory() {
  const [coverImage, setCoverImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [categoryData, setCategoryData] = useState({ name: "", coverImage: "" });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await api.get(`/mostrar-category/${id}`); 
        const category = response.data; 
        console.log(category);
        setCategoryData(category);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    fetchCategoryData();
  }, [id]);

  const handleCategoryImageChange = (imageCover) => {
    setCoverImage(imageCover);
  };

  const schema = yup.object().shape({
    name: yup.string().required("O nome da categoria é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("coverImage", coverImage);

    try {
      await api.put(`/Update-category/${id}`, formData); 

      setShowConfirmationModal(true);
      setConfirmationMessage("Atualização realizada com sucesso!");
      history.push(`/Novas-Categorias`);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-center text-gray-700 text-2xl mt-8 mb-24 font-bold">
        Update desta Categoria
      </h3>
     
      <div className="relative mt-5 w-[500px] h-[500px] mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-center  text-sm font-semibold mb-7 text-gray-700"
            >
              Nome da Categoria
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
              required
              {...register("name")}
              value={categoryData.name} 
            />
            <p className="errors">{errors.name && errors.name.message}</p>
          </div>

          <div className="">
            <InputFileCover
              onImageCoverChange={handleCategoryImageChange}
              imageUrl={categoryData.coverImage} // a URL da imagem como prop
            />
            <p className="errors">{errors.image && errors.image.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-700 hover-bg-cyan-600 text-white py-2 h-10 rounded-lg mt-5"
          >
            Atualizar Categoria
          </button>
        </form>
      </div>
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-5 rounded-lg text-center">
            <p className="text-2xl text-gray-700 font-semibold">
              {confirmationMessage}
            </p>
            <button
              onClick={() => {
                setShowConfirmationModal(false);
                window.location.reload();
              }}
              className="bg-cyan-700 text-white py-2 px-4 rounded-lg mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateCategory;
