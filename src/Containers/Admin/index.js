import React from "react";
import Sidebar from "../../Containers/Admin/Sidebar";
import Reservations from "./Reservations";
import CreateTrips from "./NewTrips/CreateTrips";
import paths from "./Paths";
import AllTrips from "./AllTrips";
import CreateCategory from "./NewCategory/CreateCategory";
import UpdateCategory from "./NewCategory/UpdateCategory";

function index({ match: { path } }) {
  return (
    <div className="flex">
      <Sidebar/>
        {path === paths.Reservations && <Reservations />}
        {path === paths.CreateTrips && <CreateTrips />}
        {path === paths.CreateCategory && <CreateCategory />}
        {path === paths.UpdateCategory && <UpdateCategory />}
        {path === paths.AllTrips && <AllTrips />}
      </div>
  );
}

export default index;
