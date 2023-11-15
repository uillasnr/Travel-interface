import React from "react";
import Maps from "./Maps";

function TripLocation({ location }) {
  return (
    <div className="container  w-full px-5 mt-20">
      <div className="w-full ">
        <h3 className="mb-5 text-lg font-semibold text-gray-700">
          Localização
        </h3>
        <Maps location={location} />
      </div>
    </div>
  );
}

export default TripLocation;
