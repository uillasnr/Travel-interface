import React from "react";

function TripHighlights({ Highlights }) {

  return (
    <div className="container mb-10 mt-5 w-full px-5">
      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        Destaques
      </h3>
      <ul className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-w-4xl gap-4 text-slate-600 font-medium text-sm justify-center items-center">
        {Highlights.map((Highlight, index) => (
          <li key={index} className="text-center">
            <img src={Highlight.url} alt={Highlight.title} className="mx-auto mb-2 max-w-[80%] sm:max-w-full" />
            <p className="text-slate-600 text-xs sm:text-sm">{Highlight.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripHighlights;
