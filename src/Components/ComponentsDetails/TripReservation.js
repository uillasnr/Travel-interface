import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../Datepicker';
import { differenceInDays } from 'date-fns';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../Input';
import Confirmation from './Confirmation';
import { useUser } from "../../hooks/UserContext";
import Login from '../../Containers/Login';
import Button from '../Button';

function TripReservation({ pricePerDay, startDate, endDate, maxGuests }) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [LoginModalOpen, setLoginModalOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const { user } = useUser()
  const { id } = useParams();


  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  // Obtenha os valores dos campos de data de início e data de término
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const date = new Date();

  // Cálculo da diferença em dias entre as datas de início e término
  const difference = differenceInDays(new Date(endDateValue), new Date(startDateValue));

  // alterações no estado do usuário e atualizar o estado de login
  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      setLoginModalOpen(false); // Feche o modal de login
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const { startDate, endDate, guests } = formData;

      // Verifique se o usuário está logado antes de prosseguir
      if (!user) {
        setIsLoading(false);
        setLoginModalOpen(true)
        return;
      }

      // Calcular o valor total da reserva
      const difference = differenceInDays(new Date(endDate), new Date(startDate));
      const totalPaid = difference * pricePerDay;

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

      // Abra o modal de confirmação
      setIsReservationModalOpen(true);

    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      setIsLoading(false);

      // exiba mensagens de erro para o usuário, se necessário
      if (error.response && error.response.status === 400) {

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
        <Button
          disabled={isLoading}
          variant="primary"
          type="submit"
        >
          Reservar agora
        </Button>

        {isReservationModalOpen && (
          <Confirmation
            isOpen={isReservationModalOpen}
            onRequestClose={() => setIsReservationModalOpen(false)}
          />
        )}
        {LoginModalOpen && (
          <Login
            isOpen={LoginModalOpen}
            onRequestClose={() => setLoginModalOpen(false)}
            errorMessage="Faça login para realizar a reserva."
          />
        )}
      </div>
    </form>
  );
}

export default TripReservation;
