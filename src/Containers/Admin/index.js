import React from "react";
import Sidebar from "../../Containers/Admin/Sidebar"
import Reservations from "./Reservations";
import CreateTrips from "./CreateTrips";


function index({props}) {

console.log(props)
    return (
        <div className="flex ">
            <Sidebar />
            <Reservations />
            <CreateTrips />
        </div>
    );
}

export default index;
