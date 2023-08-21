
import React from "react";
import nature from "../assets/nature.mp4";

function Footer() {


    return (
        <div className="relative">

            <div className="w-full h-[900px]  md:h-[600px] lg:h-[300px] object-cover" > {/* Responsividade */}
                <video className="w-full h-full object-cover" src={nature} muted autoPlay loop />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <footer className="bg-white bg-opacity-80 text-primaryDarker rounded-lg shadow-md mx-auto w-10/12">
                    <div className="container mx-auto px-4 md:px-8 flex flex-wrap text-center  justify-between">

                        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 mt-6">
                            <h2 className="text-xl font-bold mb-4 text-teal-600">Navegação</h2>
                            <ul>
                                <li><a href="#" className="hover:text-teal-600">Minha Conta</a></li>
                                <li><a href="#" className="hover:text-teal-600">Destinos</a></li>
                                <li><a href="#" className="hover:text-teal-600">Pacotes de Viagem</a></li>
                                <li><a href="#" className="hover:text-teal-600">Reservas</a></li>
                            </ul>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 mt-6">
                            <h2 className="text-xl font-bold mb-4 text-teal-600">Sobre Nós</h2>
                            <ul>
                                <li><a href="#" className="hover:text-teal-600">Sobre o Travel</a></li>
                                <li><a href="#" className="hover:text-teal-600">Contato</a></li>
                                <li><a href="#" className="hover:text-teal-600">Parceiros</a></li>
                                <li><a href="#" className="hover:text-teal-600">Depoimentos</a></li>
                            </ul>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 mt-6">
                            <h2 className="text-xl font-bold mb-4 text-teal-600">Informações Legais</h2>
                            <ul>
                                <li><a href="#" className="hover:text-teal-600">Política de Privacidade</a></li>
                                <li><a href="#" className="hover:text-teal-600">Termos de Serviço</a></li>
                                <li><a href="#" className="hover:text-teal-600">Política de Cancelamento</a></li>
                                <li><a href="#" className="hover:text-teal-600">Perguntas Frequentes</a></li>
                            </ul>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 mt-6">
                            <h2 className="text-xl font-bold mb-4 text-teal-600">Conecte-se</h2>
                            <ul>
                                <li><a href="#" className="hover:text-teal-600">Facebook</a></li>
                                <li><a href="#" className="hover:text-teal-600">Twitter</a></li>
                                <li><a href="#" className="hover:text-teal-600">Instagram</a></li>
                                <li><a href="#" className="hover:text-teal-600">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-white font-bold bg-teal-600 bg-opacity-80 text-center rounded-b-lg py-2">
                        Todos os direitos reservados &copy; 2023
                    </div>

                </footer>
            </div>
        </div>
    );
}
export default Footer