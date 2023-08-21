import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Details() {
    const [Trips, setTrips] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function loadTrips() {
            try {
                const response = await api.get(`Trips/${id}`);
                const { data } = response;
                console.log(data);

                setTrips(data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        }

        loadTrips();
    }, [id]);

    return (
        <div>

            <div className="text-white">uillas</div>



        </div>
    );
}



export default Details;
