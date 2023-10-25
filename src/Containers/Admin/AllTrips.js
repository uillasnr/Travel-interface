import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import api from "../../services/api";
import { Link } from "react-router-dom";

function AllTrips() {
    const [Trips, setTrips] = useState([]);


    useEffect(() => {
        async function loadTrips() {
            try {
                const response = await api.get('/Trips');
                const { data } = response;
                setTrips(data);
            } catch (error) {
                console.error("Error loading trips:", error);
            }
        }

        loadTrips();
    }, []);

    async function handleDeleteTrip(Id) {
        try {
            await api.delete(`/trips/${Id}`);
            // Atualize o estado local para refletir a exclusão
            setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== Id));
        } catch (error) {
            console.error("Error deleting trip:", error);

        }
    }

    const LimitDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    }

    return (
        <div className="w-full mx-5 py-5">
            {Trips &&
                Trips.map((trip) => (
                    <div className="w-full" key={trip.id}>
                        <Link to={`/detalhes/${trip.id}`} style={{ textDecoration: 'none' }}>
                            <div className="relative h-full flex cursor-pointer bg-white gap-3 m-4 drop-shadow-2xl rounded-lg transition-transform transform hover:scale-105">
                                <img src={trip.coverImage} className="rounded-lg shadow-md m-4 h-full w-[250px]" style={{ objectFit: "cover" }} alt={trip.name} />

                                <div className="m-2">
                                    <h3 className="text-gray-700 font-medium text-sm mt-2 text-center">{trip.name}</h3>

                                    <div className="flex items-center font-normal gap-1 mb-10 justify-center">
                                        <ReactCountryFlag countryCode={trip.countryCode} svg />
                                        <p className="text-xs text-gray-600">{trip.location}</p>
                                    </div>

                                    <p className="text-xs font-normal text-gray-600 text-center w-60 flex items-center px-2 my-1">
                                        {LimitDescription(trip.description, 100)}
                                    </p>

                                </div>
                                <p className="text-base pl-52 mt-20 text-center text-slate-800">
                                    <span className="text-cyan-700 font-medium">por dia</span>
                                    <h3 className="text-slate-800 font-bold">R$ {trip.pricePerDay.toString()}</h3>
                                </p>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteTrip(trip.id)}
                                    className="border-l-2 b h-full mt-[-8px] w-20 pl-2 text-red-600 hover:text-red-200 
                                     cursor-pointer absolute font-bold top-2 right-2"
                                >
                                    Excluir
                                </button>

                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
}

export default AllTrips;
