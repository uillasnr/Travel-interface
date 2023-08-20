import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import api from "../services/api";

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

    return (
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0  bg-white">
            {Trips &&
                Trips.map((Trips) => (
                    <div className="flex flex-col px-5 pb-2 border-b border-grayLighter" key={Trips.id}>
                        <div className="relative h-[200px] w-[250px]">

                            <img src={Trips.coverImage} className="rounded-lg shadow-md"
                                style={{ objectFit: "cover" }} alt={Trips.name} />
                        </div>

                        <h3 className="text-primaryDarker font-medium text-sm mt-2">{Trips.name}</h3>
                        <div className="flex items-center gap-1 my-1">
                            <ReactCountryFlag countryCode={Trips.countryCode} svg />
                            <p className="text-xs text-grayPrimary">{Trips.location}</p>
                        </div>

                        <p className="text-xs text-grayPrimary">
                            <span className="text-primary font-medium">R${Trips.pricePerDay.toString()}</span> por dia
                        </p>
                    </div>
                ))}
        </div>
    );
}

export default Trips;
