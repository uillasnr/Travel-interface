import React, { useState } from 'react';
import api from '../../services/api';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../Datepicker';
import { differenceInDays } from 'date-fns';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../Input';


function TripReservation({ pricePerDay, startDate, endDate, maxGuests }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const history = useHistory()
  const { id } = useParams();


  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const date = new Date();
  const difference = differenceInDays(new Date(endDateValue), new Date(startDateValue));

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const { startDate, endDate, guests } = formData;

      // Calcular o valor total da reserva
      const difference = differenceInDays(new Date(endDate), new Date(startDate));
      const totalPaid = difference * pricePerDay;

      // Enviar solicitação para criar a reserva
      const response = await api.post(`/TripReservation`, {
        tripId: id,
        startDate,
        endDate,
        guests,
        pricePerDay,
        totalPaid,
      });

      // Se a reserva for criada com sucesso, atualize os dados da reserva
      const { reservation } = response.data;
      setReservationData(reservation);
console.log(response)
      setIsLoading(false);

    // Redirect the user to the Confirmation page with the reservation ID
    history.push(`/Confirmation/${reservation.id}`);


    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      setIsLoading(false);

      // Trate os erros e exiba mensagens de erro para o usuário, se necessário
      if (error.response && error.response.status === 400) {
        // Se a API retornar um erro 400, as datas não estão disponíveis
        setError('startDate', {
          type: 'manual',
          message: 'As datas selecionadas não estão disponíveis para reserva.',
        });
        setError('endDate', {
          type: 'manual',
          message: 'As datas selecionadas não estão disponíveis para reserva.',
        });
      }
    }
  };



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mb-10 mt-5 w-full px-5 lg:order-2 lg:w-[400px] lg:self-start lg:rounded-lg lg:border lg:shadow-sm"
    >
      <p className="hidden pb-5 pt-7 text-primaryDarker lg:inline-block">
        <span className="text-xl font-semibold text-primaryLighter">
          R$ {pricePerDay.toString()}
        </span>{' '}
        / noite
      </p>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <Controller
            name="startDate"
            rules={{
              required: {
                value: true,
                message: 'Data inicial é obrigatória',
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                minDate={new Date()}
                maxDate={endDateValue}
                dateFormat="dd/MM/yyyy"
                className="w-full"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                placeholderText="Data de Início"
              />
            )}
          />
          <Controller
            name="endDate"
            rules={{
              required: {
                value: true,
                message: 'Data final é obrigatória',
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                dateFormat="dd/MM/yyyy"
                disabled={!startDateValue}
                className="w-full disabled:cursor-not-allowed disabled:bg-slate-100"
                minDate={new Date(startDateValue)}
                maxDate={endDate}
                error={!!errors.endDate}
                errorMessage={errors.endDate?.message}
                placeholderText="Data final"
              />
            )}
          />
        </div>

        {/* Número de hóspedes é obrigatório */}
        <Input
          className="bg-slate-200 text-black"
          {...register('guests', {
            required: {
              value: true,
              message: 'Número de hóspedes é obrigatório',
            },
            max: {
              value: maxGuests,
              message: `Número máximo de hóspedes é ${maxGuests}`,
            },
            min: { value: 1, message: 'Número mínimo de hóspedes é 1' },
          })}
          type="number"
          min="0"
          placeholder={`Hóspedes no máximo (${maxGuests})`}
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
        />
      </div>

      <div className="my-5 flex justify-between">
        <p className="text-sm font-medium text-primaryDarker">
          Total{' ('}
          {startDateValue && endDateValue && difference > 0
            ? difference === 1
              ? difference + ' noite'
              : difference + ' noites'
            : '0 noite '}
          {')'}
        </p>
        <p className="text-sm font-medium text-primaryDarker">
          R${' '}
          {startDateValue && endDateValue && difference > 0
            ? (difference * pricePerDay).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })
            : '0,00'}
        </p>
      </div>

      <div className="border-b pb-10 lg:border-none">
        <button
          className="bg-cyan-700 w-full hover:bg-cyan-600 text-white cursor-pointer rounded-lg mt-4 h-10"
          disabled={isLoading}
          variant="primary"
          type="submit"
        >
          Reservar agora
        </button>
      </div>
    </form>
  );
}

export default TripReservation;
