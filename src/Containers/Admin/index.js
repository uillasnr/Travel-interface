import React from "react";
import Sidebar from "../../Containers/Admin/Sidebar"
import Reservations from "./Reservations";
import CreateTrips from "./CreateTrips";
import paths from "./Paths";


function index({ match: { path } }) {

    return (
        <div className="flex ">
            <Sidebar />
            {path === paths.Reservations && <Reservations />}
            {path === paths.CreateTrips && <CreateTrips />}
        </div>
    );
}

export default index;
