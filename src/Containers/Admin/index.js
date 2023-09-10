import React from "react";
import Sidebar from "../../Containers/Admin/Sidebar"
import Reservations from "./Reservations";
import CreateTrips from "./CreateTrips";
import paths from "./Paths";
import AllTrips from "./AllTrips";


function index({ match: { path } }) {

    return (
        <div className="flex ">
            <Sidebar />
            {path === paths.Reservations && <Reservations />}
            {path === paths.CreateTrips && <CreateTrips />}
            {path === paths.AllTrips && <AllTrips />}
        </div>
    );
}

export default index;
