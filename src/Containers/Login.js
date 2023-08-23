import React, { useState } from "react";
import Modal from "react-modal";
import Register from "./Register";

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
        maxWidth: "400px",
        width: "90%", // Reduzido o tamanho para telas menores
        padding: "20px",
        background: "white",
    },
};

function Login({ isOpen, onRequestClose }) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="text-right ">
                <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                    &times;
                </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Faça Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                    placeholder="Seu email"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                    Senha:
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                    placeholder="Sua senha"
                    required
                />
            </div>
            <button
                type="button"
                className="w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-700"
            >
                Entrar
            </button>
            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Ainda não tem uma conta?{' '}
                    <span className="text-cyan-700 cursor-pointer" onClick={openRegisterModal}>
                        Cadastre-se
                    </span>
                </p>
            </div>
            
            <Register isOpen={isRegisterModalOpen} onRequestClose={closeRegisterModal} />
        </Modal>
    );
}

export default Login;
