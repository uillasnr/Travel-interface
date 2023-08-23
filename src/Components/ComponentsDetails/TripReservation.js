import React, { useState, useEffect } from 'react'
//import Button from '@/app/components/Button'
//import DatePicker from '@/app/components/DatePicker'
//import Input from '@/app/components/Input'
//import { Controller, useForm } from 'react-hook-form'
//import { differenceInDays } from 'date-fns'
import api from "../../services/api"


function TripReservation ([pricePerDay]) { 
    const [Reservation, setReservation] = useState ()
  /*   const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setError,
        reset,
      } = useForm() */
    /*   const startDate = watch('startDate')
      const endDate = watch('endDate')
      const date = new Date()
      const difference = differenceInDays()
      const [isLoading, setIsLoading] = useState(false)
       const router = useRouter() */
       useEffect(() => {
        async function loadReservation() {
            try {
                const response = await api.post(`/TripReservation`);
                const { data } = response;
                console.log(data);

                setReservation(data);
           
            } catch (error) {
                console.error("Error loading trip details:", error);
            }
        }

        loadReservation();
    }, []);

  
    
      /* const onSubmit = async (TripsReservationForm) => {
        setIsLoading(true)
        const request = await fetch('/api/trips/check', {
          method: 'POST',
          body: JSON.stringify({
            tripId: Reservation.id,
            startDate: Reservation.startDate,
            endDate: Reservation.endDate,
          }),
        })
        const response = await request.json()
        const error = response.error?.code
        if (error === 'TRIP_ALREADY_RESERVED') {
          setError('startDate', {
            message: 'Essa Data está reservada!',
          })
          setIsLoading(false)
          return setError('endDate', {
            message: 'Essa Data está reservada!',
          })
        }
        if (error === 'INVALID_START_DATE') {
          setIsLoading(false)
          return setError('startDate', {
            message: 'Data inicial inválida!',
          })
        }
        if (error === 'INVALID_END_DATE') {
          setIsLoading(false)
          return setError('endDate', {
            message: 'Data final inválida!',
          })
        }
    
      } */
    
      return (
        <form
         /*  onSubmit={handleSubmit(onSubmit)} */
          className="container mb-10 mt-5 w-full px-5 lg:order-2 lg:w-[400px] lg:self-start lg:rounded-lg lg:border lg:shadow-sm "
        >
          <p className="hidden pb-5 pt-7 text-primaryDarker lg:inline-block">
            <span className="text-xl font-semibold text-primaryLighter">
              R$ {Reservation.pricePerDay.toString()}
            </span>{' '}
            / noite
          </p>
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-4">
              <form
                name="startDate"
                rules={{
                  required: {
                    value: true,
                    message: 'Data inicial é obrigatória',
                  },
                }}
              /*   control={control} */
                render={({ field }) => (
                  <data
                    selected={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    minDate={new Date()}
                    maxDate={Reservation.endDate}
                    dateFormat="dd/MM/yyyy"
                    className="w-full"
                /*     error={!!errors.startDate}
                    errorMessage={errors.startDate?.message} */
                    placeholderText="Data de Ínicio"
                  />
                )}
              />
              <form
                name="endDate"
                rules={{
                  required: {
                    value: true,
                    message: 'Data final é obrigatória',
                  },
                }}
              /*   control={control} */
                render={({ field }) => (
                  <data
                 /*    selected={startDate! > endDate! ? null : field.value}
                    value={startDate! > endDate! ? '' : undefined} */
                    onChange={
                      field.onChange
                      // return startDate! > endDate!
                      //   ? reset({
                      //     endDate: null,
                      //   })
                      //   : field.onChange
                    }
                    onBlur={field.onBlur}
                    dateFormat="dd/MM/yyyy"
                    ref={field.ref}
                   /*  disabled={!startDate} */
                    className="w-full disabled:cursor-not-allowed disabled:bg-slate-100 "
                    minDate={
                      new Date() ||
                      new Date()
                    }
                    maxDate={Reservation.endDate}
                   /*  error={!!errors.endDate}
                    errorMessage={errors.endDate?.message} */
                    placeholderText="Data final"
                  />
                )}
              />
            </div>
            <input
              {...('guests', {
                required: {
                  value: true,
                  message: 'Número de hóspedes é obrigatório',
                },
                max: {
                  value: Reservation.maxGuests,
                  message: `Número máximo de hóspedes é ${Reservation.maxGuests}`,
                },
                min: { value: 1, message: 'Número mínimo de hóspedes é 1' },
              })}
              type="number"
              min="0"
              placeholder={`Hóspedes no maxìmo (${Reservation.maxGuests})`}
           /*    error={!!errors.guests}
              errorMessage={errors.guests?.message} */
            />
          </div>
          <div className="my-5 flex justify-between">
            <p className="text-sm font-medium text-primaryDarker">
              Total{' ('}
             {/*  {startDate && endDate && difference > 0
                ? difference === 1
                  ? difference + ' noite'
                  : difference + ' noites'
                : 0 + ' noite '}
              {')'} */}
            </p>
            <p className="text-sm font-medium text-primaryDarker">
              R${' '}
           {/*    {startDate && endDate && differenceInDays(endDate, startDate) > 0
                ? differenceInDays(endDate, startDate) * +Reservation.pricePerDay
                : '0'} */}
            </p>
          </div>
          <div className="border-b pb-10 lg:border-none">
            <button  variant="primary">
              Reservar agora
            </button>
          </div>
        </form>
      )
    }

export default TripReservation