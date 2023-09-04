import React, { useState } from "react";
import InputFileCover from "./InputFileCover"
import InputFile from "./InputFile";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

function CreateTrip() {
    const [coverImage, setCoverImage] = useState(null);

    const handleCoverImageChange = (image) => {
        setCoverImage(image);
    };

    const schema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório"),
        description: yup.string().required("A descrição é obrigatória"),
        startDate: yup.date().required("A data de início é obrigatória"),
        endDate: yup.date().required("A data de término é obrigatória"),
        location: yup.string().required("A localização é obrigatória"),
        countryCode: yup.string().required("O código do país é obrigatório"),
        pricePerDay: yup.number().required("O preço por dia é obrigatório"),
        highlihts: yup.string().required("Os destaques são obrigatórios"),
        maxGuests: yup.number().required("O número máximo de hóspedes é obrigatório"),
        recommended: yup.boolean(),
    });



    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("startDate", data.startDate);
            formData.append("endDate", data.endDate);
            formData.append("location", data.location);
            formData.append("countryCode", data.countryCode);
            formData.append("pricePerDay", data.pricePerDay);
            formData.append("highlihts", data.highlihts);
            formData.append("maxGuests", data.maxGuests);
            formData.append("recommended", data.recommended);
            formData.append("coverImage", coverImage);

            // Enviar o formulário para a API
            const response = await api.post("trips", formData);
            console.log("Resposta da API:", response.data);

            // Redirecionar ou fazer outras ações após o envio bem-sucedido
        } catch (error) {
            // Lidar com erros de envio para a API, se necessário
            console.error("Erro ao enviar o formulário para a API:", error);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen w-full flex items-center justify-center">
            <div className="mt-5  bg-opacity-80 bg-slate-500 p-6 rounded-lg shadow-lg">

                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Criar uma nova viagem
                </h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            {...register("name")}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <p className="errors">{errors.name?.message}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="startDate" className="block text-gray-800 font-semibold mb-2">
                                Data de Início:
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                {...register("startDate")}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                            <p className="errors">{errors.startDate?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-gray-800 font-semibold mb-2">
                                Data de Término:
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                {...register("endDate")}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                            <p className="errors">{errors.endDate?.message}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-800 font-semibold mb-2">
                            Localização:
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            {...register("location")}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <p className="errors">{errors.location?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="countryCode" className="block text-gray-800 font-semibold mb-2">
                            Código do País:
                        </label>
                        <input
                            type="text"
                            id="countryCode"
                            name="countryCode"
                            {...register("countryCode")}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <p className="errors">{errors.countryCode?.message}</p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        <div className="mb-4  ">
                            <label htmlFor="pricePerDay" className="block text-gray-800 font-semibold mb-2">
                                Preço por Dia:
                            </label>
                            <input
                                type="number"
                                id="pricePerDay"
                                name="pricePerDay"
                                {...register("pricePerDay")}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                            <p className="errors">{errors.pricePerDay?.message}</p>
                        </div>

                        <div className="mb-4  w-full">
                            <label htmlFor="maxGuests" className="block  text-gray-800 font-semibold mb-2">
                                Máximo de Hóspedes:
                            </label>
                            <input
                                type="number"
                                id="maxGuests"
                                name="maxGuests"
                                {...register("maxGuests")}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                            <p className="errors">{errors.maxGuests?.message}</p>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="highlihts" className="block text-gray-800 font-semibold mb-2">
                            Destaques (separados por vírgula):
                        </label>
                        <input
                            type="text"
                            id=" highlihts"
                            name="highlihts"
                            {...register("highlihts")}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <p className="errors">{errors.highlihts?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="recommended" className="block text-gray-800 font-semibold mb-2">
                            Recomendado:
                        </label>
                        <input
                            type="checkbox"
                            id="recommended"
                            name="recommended"
                            {...register("recommended")}
                            className="text-blue-500"
                        />
                        <p className="errors">{errors.recommended?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-800 font-semibold mb-2"
                        >
                            Descrição:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            {...register("description")}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            rows="4"
                            required
                        />
                        <p className="errors">{errors.description?.message}</p>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Criar Viagem
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 pl-4 mt-[-405px]">
                <h3 className="font-semibold text-center mb-2">Imagem de Capa</h3>
                <InputFileCover onImageChange={handleCoverImageChange} />
                <div className="flex gap-3 mt-3">
                    <InputFile />
                    <InputFile />
                    <InputFile />
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
