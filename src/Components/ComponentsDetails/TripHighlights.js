import React from "react";

function TripHighlights({ Highlights }) {
  return (
    <div className="container mb-10 mt-5 w-full px-5">
      <h3 className="mb-2 text-lg font-semibold  text-gray-700 ">
        Destaques
      </h3>
      <ul className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
       gap-[10px] lg:max-w-4xl text-slate-600 font-medium text-sm">
        {Highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
}

export default TripHighlights;
