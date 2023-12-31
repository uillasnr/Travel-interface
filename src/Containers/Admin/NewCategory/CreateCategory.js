import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";
import InputFileCover from "../InputFileCover";
import ListCategories from "./ListCategory";

function CreateCategory() {
  const [coverImage, setCoverImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

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
      await api.post("/criar-category", formData);
      setShowConfirmationModal(true);
      setConfirmationMessage("Categoria criada com sucesso!");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="w-full">
      <ListCategories />
      <h3 className="text-center text-gray-700 text-2xl mt-8 font-bold">
        Criar uma Categoria
      </h3>

      <div className="relative  mt-5 w-[700px] h-[330px] mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-lg">
        <form className="p-5 flex gap-7 " onSubmit={handleSubmit(onSubmit)}>
          <div className="w-96">
            <InputFileCover
              onImageCoverChange={handleCategoryImageChange}
              /*  {...register("image")} */
            />
            <p className="errors">{errors.image && errors.image.message}</p>
          </div>

          <div className=" flex flex-col w-60">
            <div className="mt-16 ">
              <label
                htmlFor="categoryName"
                className="block text-center  text-sm font-semibold text-gray-700"
              >
                Nome da Categoria
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                className="w-full border mt-4 border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                required
                {...register("name")}
              />
              <p className="errors">{errors.name && errors.name.message}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white py-2 h-10 rounded-lg mt-5"
            >
              Criar Categoria
            </button>
          </div>
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

export default CreateCategory;
