import React, { useEffect, useState } from "react";
import api from "../services/api";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

function MyTrips() {
    const [myTrips, setMyTrips] = useState([]);

    useEffect(() => {
        async function loadMyTrips() {
            try {
                // Use o ID do usuário da URL na URL da solicitação
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

    return (
        <div className="p-8">
            <h1 className="text-2xl font-extrabold text-gray-700 text-center">
                Minhas Reservas
            </h1>
            <Link className="w-max transition-all hover:scale-110" to={'/'}>
                <FiArrowLeftCircle size={30} />
            </Link>
            <div className="grid grid-cols-1 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-gray-400">
                {myTrips.length > 0 ? (

                    myTrips.map((Trip) => (
                        <div key={Trip.id} className="flex w-full flex-1 flex-col gap-5">
                            <div className="rounded-xl border border-[#BBBFBF] p-5">
                                <div className="flex flex-wrap items-center gap-7 border-b border-b-[#BBBFBF] pb-5 xl:flex-nowrap">
                                    <img
                                        className="h-full min-h-[106px] w-full rounded-xl object-cover md:max-w-[124px]"
                                        width={500}
                                        height={500}
                                        quality={100}
                                        alt=""
                                        src={Trip.trip.coverImage} // Corrigir para acessar diretamente myTrip.trip.coverImage
                                    />
                                    <div className="flex w-full max-w-[250px] flex-col items-start gap-2">
                                        <h2 className="text-base font-semibold text-primaryDarker">
                                            {Trip.trip.name}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <ReactCountryFlag
                                                countryCode={Trip.trip.countryCode}
                                                svg
                                            />
                                            <p className="text-xs font-medium text-grayPrimary underline">
                                                {Trip.trip.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
                                        Sobre a Viagem
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 border-b border-b-[#BBBFBF] pb-5">
                                    <div>
                                        <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                                            Data
                                        </p>
                                        <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                                            {`${new Date(Trip.startDate).toLocaleDateString()} - ${new Date(Trip.endDate).toLocaleDateString()}`}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                                            Hóspedes
                                        </p>
                                        <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                                            {Trip.guests === 1
                                                ? "1 hóspede"
                                                : `${Trip.guests} hóspedes`}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
                                        Informações do pagamento
                                    </h3>
                                    <div className="mb-7 flex justify-between">
                                        <p className="text-sm font-medium text-primaryDarker">
                                            Total
                                        </p>
                                        <p className="text-sm font-semibold text-primaryDarker">
                                            {`R$ ${parseFloat(Trip.totalPaid).toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                            })}`}
                                        </p>
                                    </div>
                                    <button className='bg-cyan-700 w-full hover:bg-cyan-600 text-white cursor-pointer rounded-lg mt-4 h-10'
                                        /*   onClick={() => setIsOpenModalCancelled((prev) => !prev)} */
                                        variant="canceled"
                                    >
                                        Cancelar
                                    </button>
                                    {/*  <AnimatePresence>
                    {isOpenModalCancelled && (
                        <ModalCancelled
                            handleDeleteReservation={handleDeleteReservation}
                            setIsOpenModalCancelled={setIsOpenModalCancelled}
                            reservationId={reservation.id}
                        />
                    )}
                </AnimatePresence> */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma viagem encontrada.</p>
                )}
            </div>
        </div>
    );
}

export default MyTrips;
