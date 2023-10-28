import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import api from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import formatPrice from "../hooks/formatPrice";

function ListCategory() {
  const [Categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get(`category/${categoryId}`);
        const { data } = response;
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, [categoryId]);

  const LimitDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  const LimitLocation = (location, maxLength) => {
    if (location.length > maxLength) {
        return `${location.slice(0, maxLength)}...`;
    }
    return location;
}

  return (
    <div>
      <div>
        <h1 className="text-cyan-700 text-center my-3.5 text-4xl pb-4 border-b font-black">
          Travel
        </h1>
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        Hospedagens Encontradas
        <h3 className="text-xl font-normal text-center text-gray-700">
          Listamos os melhores locais para você!
          <div className="pl-5">
            <Link className="w-max transition-all hover:scale-110" to={"/"}>
              <FiArrowLeftCircle size={30} />
            </Link>
          </div>
          {Categories.length === 0 ? (
            <p className="text-center mt-40 text-lg text-gray-500">
              Nenhuma viagem encontrada.
            </p>
          ) : (
            <div className="grid grid-cols-1 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-gray-400">
              {Categories.map((Categories) => (
                <div className="flex flex-col items-center" key={Categories.id}>
                  <Link
                    to={`/detalhes/${Categories.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="relative h-[320px] w-[250px] cursor-pointer bg-white drop-shadow-2xl 
                                              rounded-lg transition-transform transform hover:scale-105"
                    >
                      <img
                        src={Categories.coverImage}
                        className="rounded-lg shadow-md w-full h-[170px]"
                        style={{ objectFit: "cover" }}
                        alt={Categories.name}
                      />

                      <h3 className="text-gray-700 font-medium text-sm mt-2 text-center">
                        {Categories.name}
                      </h3>

                      <div className="flex items-center font-normal gap-1 my-1 justify-center">
                        <ReactCountryFlag
                          countryCode={Categories.countryCode}
                          svg
                        />
                        <p className="text-xs text-gray-600">
                        {LimitLocation(Categories.location, 40)}
                        </p>
                      </div>

                      <p className="text-xs border-y-2 text-center text-slate-800">
                        <span className="text-cyan-700 font-medium flex flex-col items-center space-y-1">
                          por dia
                          <span className="text-slate-800 font-bold">
                            {formatPrice(Categories.pricePerDay)}
                          </span>
                        </span>
                      </p>

                      <p className="text-xs font-normal text-gray-600 text-center px-2 my-1">
                        {LimitDescription(Categories.description, 100)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </h3>
      </h1>
    </div>
  );
}

export default ListCategory;
