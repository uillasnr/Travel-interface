import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import formatPrice from "../hooks/formatPrice";

function Search() {
    const location = useLocation();
    const [Trips, setTrips] = useState([]);

    useEffect(() => {
        if (location.state && location.state.trips) {
            setTrips(location.state.trips);
        } else {
            // Handle the case when there are no trips passed
            console.error("No trip data found in location state");
        }
    }, [location.state]);

    const LimitDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    }

    const LimitLocation = (location, maxLength) => {
        if (location.length > maxLength) {
            return `${location.slice(0, maxLength)}...`;
        }
        return location;
    }

    return (
        <div>
            <div>
                <h1 className="text-cyan-700 text-center my-3.5 text-4xl pb-4 border-b font-black">Travel</h1>
            </div>
            <h1 className="text-3xl font-semibold text-center text-gray-700">
                Hospedagens Encontradas
                <h3 className="text-xl font-normal text-center text-gray-700">
                    Listamos os melhores locais para você!

                    <div className="pl-5">
                        <Link className="w-max transition-all hover:scale-110" to={'/'}>
                            <FiArrowLeftCircle size={30} />
                        </Link>
                    </div>

                    {Trips.length === 0 ? (
                        <p className="text-center mt-40 text-lg text-gray-500">
                            Nenhuma viagem encontrada.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-gray-400">
                            {Trips.map((trip) => (
                                <div className="flex flex-col items-center" key={trip.id}>
                                    <Link to={`/detalhes/${trip.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="relative h-[320px] w-[250px] cursor-pointer bg-white drop-shadow-2xl 
                                              rounded-lg transition-transform transform hover:scale-105">
                                            <img src={trip.coverImage} className="rounded-lg shadow-md w-full h-[170px]"
                                                style={{ objectFit: "cover" }} alt={trip.name} />

                                            <h3 className="text-gray-700 font-medium text-sm mt-2 text-center">{trip.name}</h3>

                                            <div className="flex items-center font-normal gap-1 my-1 justify-center">
                                                <ReactCountryFlag countryCode={trip.countryCode} svg />
                                                <p className="text-xs text-gray-600">{LimitLocation(trip.location, 35)}</p>
                                            </div>

                                            <p className="text-xs border-y-2 text-center text-slate-800">
                                                <span className="text-cyan-700 font-medium flex flex-col items-center space-y-1">
                                                    por dia
                                                    <span className="text-slate-800 font-bold">{formatPrice(trip.pricePerDay)}</span>
                                                </span>
                                            </p>

                                            <p className="text-xs font-normal text-gray-600 text-center px-2 my-1">
                                                {LimitDescription(trip.description, 100)}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </h3>
            </h1>
        </div>
    );
}

export default Search;
