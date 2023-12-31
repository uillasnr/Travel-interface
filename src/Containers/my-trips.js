import React, { useEffect, useState } from "react";
import api from "../services/api";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import Button from "../Components/Button";

function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [reservationIdToDelete, setReservationIdToDelete] = useState(null);

  useEffect(() => {
    async function loadMyTrips() {
      try {
        const response = await api.get(`/viagens`);
        const { data } = response;
        console.log(data);
        setMyTrips(response.data);
      } catch (error) {
        console.error("Error loading trip details:", error);
      }
    }

    loadMyTrips();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await api.delete(`/Reservation/${reservationId}`);

      // Atualize o estado para remover a reserva excluída
      setMyTrips((prevMyTrips) =>
        prevMyTrips.filter((Trip) => Trip.id !== reservationId)
      );

      setIsDeleteConfirmationOpen(false);
      setReservationIdToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
    }
  };

  const LimitLocation = (location, maxLength) => {
    if (location && location.length > maxLength) {
      return `${location.slice(0, maxLength)}...`;
    }
    return location;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold mb-10 text-gray-700 text-center">
        Minhas Reservas
      </h1>
      <div className="mb-5">
        <Link className=" transition-all hover:scale-110" to={"/"}>
          <FiArrowLeftCircle size={30} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 border-gray-400">
        {myTrips.length > 0 ? (
          myTrips.map((Trip) => (
            <div
              key={Trip.id}
              className="flex flex-1 items-center flex-col gap-5 "
            >
              <div className="rounded-xl border border-[#BBBFBF] bg-white p-5 w-3/4 sm:w-80 md:w-72 lg:w-96 xl:w-96 2xl:w-3/4">
                <div className="flex flex-wrap items-center gap-7 border-b border-b-[#BBBFBF] pb-5 justify-center xl:flex-nowrap">
                  <img
                    className="h-full min-h-[106px] w-full rounded-xl object-cover md:max-w-[124px]"
                    width={500}
                    height={500}
                    quality={100}
                    alt=""
                    src={Trip.trip.coverImage}
                  />
                  <div className="flex w-full max-w-[250px] flex-col  gap-2 text-center items-center xl:flex-nowrap">
                    <h2 className="text-base font-semibold text-primaryDarker">
                      {Trip.trip.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <ReactCountryFlag
                        countryCode={Trip.trip.countryCode}
                        svg
                      />
                      <p className="text-xs font-medium text-grayPrimary underline">
                        {LimitLocation(Trip.trip.location, 23)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center ">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    Sobre a Viagem
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-16 border-b border-b-[#BBBFBF] pb-5 md:gap-1">
                  <div className="flex-1 text-center">
                    <p className="text-sm font-semibold leading-relaxed  text-gray-900">
                      Data
                    </p>
                    <span className="text-sm font-normal leading-relaxed  text-gray-600 ">
                      {`${new Date(
                        Trip.startDate
                      ).toLocaleDateString()} - ${new Date(
                        Trip.endDate
                      ).toLocaleDateString()}`}
                    </span>
                  </div>

                  <div className="flex-1 text-center mt-2 sm:mt-0">
                    <p className="text-sm font-semibold leading-relaxed  text-gray-900">
                      Hóspedes
                    </p>
                    <span className="text-sm font-normal leading-relaxed text-gray-600">
                      {Trip.guests === 1
                        ? "1 hóspede"
                        : `${Trip.guests} hóspedes`}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="mb-[12px] text-sm text-center font-semibold text-gray-900">
                    Informações do pagamento
                  </h3>
                  <div className="mb-7 flex justify-between">
                    <p className="text-sm font-semibold text-gray-900">Total</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {`R$ ${parseFloat(Trip.totalPaid).toLocaleString(
                        "pt-BR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}`}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setIsDeleteConfirmationOpen(true);
                      setReservationIdToDelete(Trip.id);
                    }}
                    variant="canceled"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700  font-medium text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Você ainda não tem nenhuma reserva!
          </p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded-lg ">
            <p className="text-lg font-semibold">
              Tem certeza de que deseja cancelar esta reserva?
            </p>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  handleDeleteReservation(reservationIdToDelete);
                  setIsDeleteConfirmationOpen(false); // Feche o modal após a confirmação
                }}
                className="mt-6"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
