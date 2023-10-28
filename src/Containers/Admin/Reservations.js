import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const TABLE_HEAD = ["Name", "Data inicial", "Data final", "Total", "hóspedes"];

function Reservations() {
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        async function loadReservations() {
            try {
                const response = await api.get('todasTrips');
                const { data } = response;
                setReservations(data);
            } catch (error) {
                console.error("Error loading reservations:", error);
            }
        }
        loadReservations();
    }, []);

    return (
        <div className="h-full w-full m-6 ">
             <h3 className="text-center text-gray-700 text-2xl  mb-7 font-bold">
             Reservas das Viagens
            </h3>
        <Card >
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(({ user, startDate, endDate, totalPaid, guests }, index) => {
                        const isLast = index === reservations.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={user.userId}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {user.name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {new Date(startDate).toLocaleDateString()}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {new Date(endDate).toLocaleDateString()}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        R$ {totalPaid}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal pl-7"
                                    >
                                        {guests}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
        </div>
    );
}

export default Reservations;
