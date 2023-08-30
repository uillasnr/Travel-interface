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
  /*        maxWidth: "400px",  */
        width: "60%", // Reduzido o tamanho para telas menores
        height: "80%", // Reduzido o tamanho para
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







    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
        >
            

                <div className="flex mt-16 justify-center">
                    <div key={trip.id} className="w-full">
                     
                            <div className="flex flex-wrap items-center justify-center gap-7 border-b border-b-[#BBBFBF] pb-5 xl:flex-nowrap">
                                <img
                                    className="h-[200px] min-h-[106px] w-[350px] rounded-xl object-cover md:max-w-[124px]"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    alt=""
                                    src={trip.coverImage}
                                />
                                <div className="">
                                    <h2 className="text-base font-semibold  text-primaryDarker">
                                        {trip.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <ReactCountryFlag countryCode={trip.countryCode} svg />
                                        <p className="text-xs font-medium text-grayPrimary underline">
                                            {trip.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h3 className="mb-[12px] text-sm font-semibold text-center text-primaryDarker">
                                    Sobre a Viagem
                                </h3>
                            </div>
                            
                            <div className="flex  gap-48 border-b border-b-[#BBBFBF] pb-5">
                                <div>
                                    <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                                        Data
                                    </p>
                                    <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                                        {`${new Date(startDate).toLocaleDateString()} - ${new Date(
                                            endDate
                                        ).toLocaleDateString()}`}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-normal leading-relaxed text-primaryDarker">
                                        Hóspedes
                                    </p>
                                    <span className="text-sm font-normal leading-relaxed text-primaryDarker">
                                        {guests === 1 ? "1 hóspede" : `${guests} hóspedes`}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h3 className="mb-[12px] text-sm font-semibold text-primaryDarker">
                                    Informações do pagamento
                                </h3>
                                <div className="mb-7 flex justify-between">
                                    <p className="text-sm font-medium text-primaryDarker">Total</p>
                                    <p className="text-sm font-semibold text-primaryDarker">
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
