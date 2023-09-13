
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
      const response = await api.get(`/Busca?text=${formData.destination}&startDate=${formData.startDate}&budget=${formData.budget}`);
      console.log(response)
      const { data } = response;
      setSearchResults(data);

      history.push("/Busca", { trips: data }); // Pass the trips data as a parameter
    } catch (error) {
      console.error("Erro ao buscar viagem pelo nome:", error);
    }
  };



  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center gap-4 bg-bg-word bg-cover bg-center bg-no-repeat px-5 pt-5 text-xl font-semibold md:py-20">

        <Input
          {...register('destination', {
            required: {
              value: true,
              message: 'O Destino é obrigatório',
            },
          })}
          error={!!errors.destination}
          className="w-full"
          errorMessage={errors.destination?.message}
          placeholder="Onde você quer ir?"
        />
        <div className="flex w-full gap-4 ">
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
