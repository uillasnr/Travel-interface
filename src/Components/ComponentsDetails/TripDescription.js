import React from "react";

function TripDescription({ description }) {
  return (
    <div className="container mb-5 w-full px-5 lg:max-w-[780px]">
      <h3 className="mb-2 text-lg mt-14 font-semibold text-gray-700 ">
        Sobre a Viagem
      </h3>
      <p className="text-sm font-normal leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default TripDescription
