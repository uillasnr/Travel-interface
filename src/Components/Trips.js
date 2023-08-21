import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import api from "../services/api";
import { Link } from "react-router-dom";


function Trips() {
    const [Trips, setTrips] = useState([]);

    useEffect(() => {
        async function loadTrips() {
            try {
                const response = await api.get('Trips');
                const { data } = response;
                console.log(data);

                setTrips(data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        }

        loadTrips();
    }, []);

    const LimitDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    }

    return (
        <div className="grid grid-cols-1 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-gray-400">
            {Trips &&
                Trips.map((trip) => (

                    <div className="flex flex-col items-center" key={trip.id}>
                        <Link to={`/detalhes/${trip.id}`} style={{ textDecoration: 'none' }}>
                            <div className="relative h-[320px] w-[250px] cursor-pointer bg-white drop-shadow-2xl 
                                rounded-lg transition-transform transform hover:scale-105">

                                <img src={trip.coverImage} className="rounded-lg shadow-md"
                                    style={{ objectFit: "cover" }} alt={trip.name} />

                                <h3 className="text-gray-700 font-medium text-sm mt-2 text-center">{trip.name}</h3>

                                <div className="flex items-center font-normal gap-1 my-1 justify-center">
                                    <ReactCountryFlag countryCode={trip.countryCode} svg />
                                    <p className="text-xs text-gray-600">{trip.location}</p>
                                </div>

                                <p className="text-xs border-y-2 text-center text-slate-800">
                                    <span className="text-cyan-700 font-medium">por dia</span>
                                    <h3 className="text-slate-800 font-bold">R${trip.pricePerDay.toString()}</h3>
                                </p>
                                <p className="text-xs font-normal text-gray-600 text-center px-2 my-1">
                                    {LimitDescription(trip.description, 100)}</p>
                            </div>
                        </Link>
                    </div>

                ))}

        </div>
    );
}

export default Trips;
