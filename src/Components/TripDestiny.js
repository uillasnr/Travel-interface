import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import api from "../services/api";
import { Link } from "react-router-dom";
import formatPrice from "../hooks/formatPrice";


function TripDestiny() {
    const [TripDestiny, setTripDestiny] = useState([]);

    useEffect(() => {
        async function loadTrips() {
            try {
                const response = await api.get('/Destino');
                const { data } = response;
              

                setTripDestiny(data);
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

    const LimitLocation = (location, maxLength) => {
        if (location.length > maxLength) {
            return `${location.slice(0, maxLength)}...`;
        }
        return location;
    }

    return (
        <div className="grid grid-cols-1 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-gray-400">
          
            {TripDestiny &&
                TripDestiny.map((TripDestiny) => (

                    <div className="flex flex-col items-center" key={TripDestiny.id}>
                        <Link to={`/detalhes/${TripDestiny.id}`} style={{ textDecoration: 'none' }}>
                            <div className="relative h-[320px] w-[250px] cursor-pointer bg-white drop-shadow-2xl 
                                rounded-lg transition-transform transform hover:scale-105">

                                <img src={TripDestiny.coverImage} className="rounded-lg shadow-md w-full h-[170px]"
                                    style={{ objectFit: "cover" }} alt={TripDestiny.name} />

                                <h3 className="text-gray-700 font-medium text-sm mt-2 text-center">{TripDestiny.name}</h3>

                                <div className="flex items-center font-normal gap-1 my-1 justify-center">
                                    <ReactCountryFlag countryCode={TripDestiny.countryCode} svg />
                                    <p className="text-xs text-gray-600">{LimitLocation(TripDestiny.location, 40)}</p>
                                </div>

                                <p className="text-xs border-y-2 text-center text-slate-800">
                                    <span className="text-cyan-700 font-medium flex flex-col items-center space-y-1">
                                        por dia
                                        <span className="text-slate-800 font-bold">{formatPrice(TripDestiny.pricePerDay)}</span>
                                    </span>
                                </p>

                                <p className="text-xs font-normal text-gray-600 text-center px-2 my-1">
                                    {LimitDescription(TripDestiny.description, 100)}</p>
                            </div>
                        </Link>
                    </div>

                ))}

        </div>
    );
}

export default TripDestiny;
