
import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import Button from "./Button";
import { FiSearch } from "react-icons/fi"
import Datepicker from "../../src/Components/Datepicker";
import CurrencyInput from "../../src/Components/CurruncyInput"
import { useHistory } from "react-router-dom";
import Input from "./Input";
import api from "../services/api";

function TripSearch() {
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await api.get(`/Busca?text=${formData.destination}&startDate=${formData.startDate}&budget=${formData.budget}`)
      console.log(response)
      const { data } = response;
      setSearchResults(data);

      history.push("/Busca", { trips: data });
    } catch (error) {
      console.error("Erro ao buscar viagem pelo nome:", error);
    }
  };



  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center  text-center">

        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold w-full px-4">
          Pacotes de viagem incríveis te esperam
        </h1>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold w-full mt-2">
          Nossas promoções imbatíveis!
        </h2>
      </div>
      <div className="bg-white drop-shadow-2xl bg-opacity-80 rounded-lg flex flex-col mt-6 p-4 gap-4 w-[350px] 
        sm:w-[500px]  md:flex-row md:mx-4 md:w-[748px] lg:flex-row lg:mx-auto lg:p-4 lg:mt-12 lg:w-[948px] xl:w-[1120px]">

        <Input
          {...register('destination', {
            required: {
              value: true,
              message: 'O Destino é obrigatório',
            },
          })}
          error={!!errors.destination}
          className="w-full  border rounded-lg focus:outline-none focus:border-cyan-700 shadow-sm"
          errorMessage={errors.destination?.message}
          placeholder="Onde você quer ir?"
        />
        <div className="flex gap-4 w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Datepicker
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="w-full"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                placeholderText="Data de Ínicio"
              />
            )}
          />
          <CurrencyInput
            name="budget"
            {...register('budget')}
            className="w-full"
            placeholder="Orçamento?"
          />
        </div>
        <Button
          className="lg:w-1/2"
          onClick={handleSubmit(onSubmit)}
        >
          Pesquisar
        </Button>


      </div>

    </form>
  );
}

export default TripSearch;
