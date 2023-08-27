import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TripsHeader from "../Components/ComponentsDetails/TripHeader";
import TripHighlights from "../Components/ComponentsDetails/TripHighlights";
import TripDescription from "../Components/ComponentsDetails/TripDescription";
import TripReservation from "../Components/ComponentsDetails/TripReservation";
import TripLocation from "../Components/ComponentsDetails/TripLocation";


function TripsDetails() {
    const [Header, setHeader] = useState({});
    const [Highlihts, setHighlihts] = useState([]);
    const [Description, setDescription] = useState([]);
    const [pricePerDay, setPricePerDay] = useState();
    const [location, setLocation] = useState()
    const [startDate, setStartDate] = useState(); // Defina startDate no estado
    const [endDate, setEndDate] = useState();     // Defina endDate no estado
    const [maxGuests, setMaxGuests] = useState()
   // const [totalPaid, setTotalPaid] = useState(); // Defina totalPaid no estado
    const { id } = useParams();

    useEffect(() => {
        async function loadTripDetails() {
            try {
                const response = await api.get(`Trips/${id}`);
                const { data } = response;
                console.log(data);

                setHeader(data);
                setHighlihts(data.highlihts);
                setDescription(data.description)
                setPricePerDay(data.pricePerDay)
                setLocation(data.location)
                setStartDate(data.startDate); // Defina startDate no estado
                setEndDate(data.endDate);     // Defina endDate no estado
                setMaxGuests(data.maxGuests);
                //setTotalPaid(data.TotalPaid)
            } catch (error) {
                console.error("Error loading trip details:", error);
            }
        }

        loadTripDetails();
    }, [id]);

    return (
        <>
            <h1 className="text-gray-700 text-center my-3.5 text-4xl  border-b  font-black">Travel</h1>
            {Header && (
                <TripsHeader Header={Header} />
            )}

            {Highlihts && (
                <TripHighlights Highlights={Highlihts} />
            )}

            {Description && (
                <TripDescription description={Description} />
            )}

            {pricePerDay && startDate && endDate && maxGuests &&  (
                <TripReservation  pricePerDay={pricePerDay} startDate={startDate} endDate={endDate} maxGuests={maxGuests} />
            )}

            {location && (
                <TripLocation location={location} />
            )}

        </>
    );
}

export default TripsDetails;


