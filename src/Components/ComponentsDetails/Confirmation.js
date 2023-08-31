import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import ReactCountryFlag from "react-country-flag";
import { useHistory } from "react-router-dom";



const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 1000,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: "60%",
        height: "80%", 
        padding: "20px",
        background: "white",
    },
};

function Confirmation({ isOpen, onRequestClose }) {
    const [confirmationData, setConfirmationData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function loadConfirmation() {
            try {
                const response = await api.get(`/Confirmation`);
                const { data } = response;
                console.log(data);
                setConfirmationData(data.reservation);
            } catch (error) {
                console.error("Error loadConfirmation", error);
            }
        }

        loadConfirmation();
    }, []);

    if (!confirmationData) {
        return <p>Carregando...</p>;
    }

    // criar a reserva
    const handleFinalizeReservation = async () => {
        try {
            const response = await api.post("/Reservation", {
                tripId: confirmationData.trip.id,
                startDate: confirmationData.startDate,
                endDate: confirmationData.endDate,
                guests: confirmationData.guests,
                totalPaid: confirmationData.totalPaid,
            });

            const { data } = response;
            console.log(data);

            history.push("/");

            // Você também pode exibir uma mensagem de sucesso usando algum estado no componente, se desejar.

        } catch (error) {
            console.error("Erro ao finalizar a reserva", error);
            // Lide com o erro, exiba uma mensagem de erro para o usuário, etc.
        }
    };

    const { trip, startDate, endDate, guests, totalPaid } = confirmationData;


    const LimitDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    }




    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="flex mt-6 justify-center mx-2.5">
            <div key={trip.id} className="w-full">
      
              <h3 className="text-lg mb-10 font-bold text-center text-gray-700">
                Sua viagem
              </h3>
      
              <div className="flex flex-wrap mb-7 items-center justify-center gap-7 border-b border-b-[#BBBFBF] pb-5 xl:flex-nowrap">
                <img
                  className="h-[200px] w-[250px] min-h-[106px] rounded-xl object-cover md:max-w-[250px]"
                  alt=""
                  src={trip.coverImage}
                />
                <div className="text-center">
                  <h2 className="text-base font-semibold text-gray-700">
                    {trip.name}
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <ReactCountryFlag countryCode={trip.countryCode} svg />
                    <p className="text-xs font-medium text-gray-700 underline">
                      {trip.location}
                    </p>
                  </div>
                  <p className="text-xs font-normal text-gray-600 text-center px-2 my-12">
                    {LimitDescription(trip.description, 400)}
                  </p>
                </div>
              </div>
      
              <div className="flex justify-around xl:gap-48 border-b border-b-[#BBBFBF] pb-5">
                <div className="text-center">
                  <p className="text-sm font-medium leading-relaxed text-gray-900">
                    Data da viagem
                  </p>
                  <span className="text-sm font-normal leading-relaxed text-gray-600">
                    {`${new Date(startDate).toLocaleDateString()} - ${new Date(
                      endDate
                    ).toLocaleDateString()}`}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium leading-relaxed text-gray-900">
                    Hóspedes
                  </p>
                  <span className="text-sm font-normal leading-relaxed text-gray-600">
                    {guests === 1 ? "1 hóspede" : `${guests} hóspedes`}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="mb-[12px] text-base text-center font-bold text-gray-700">
                  Informações do pagamento
                </h3>
                <div className="mb-7 flex justify-around">
                  <p className="text-sm font-medium text-gray-600">Total:</p>
                  <p className="text-sm font-semibold text-gray-600">
                    {`R$ ${parseFloat(totalPaid).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                  </p>
                </div>
                <button
                  className="bg-cyan-700 w-full hover:bg-cyan-600 text-white cursor-pointer rounded-lg mt-4 h-10"
                  onClick={handleFinalizeReservation}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </Modal>
      );
}

export default Confirmation;
