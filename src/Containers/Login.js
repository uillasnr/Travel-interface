import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../services/api";
import Modal from "react-modal";
import Register from "./Register";
import { useUser } from "../hooks/UserContext";
import Button from "../Components/Button";


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
        width: "90%", 
        padding: "20px",
        background: "white",
    },
};

function Login({ isOpen, onRequestClose, errorMessage }) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { login } = useUser()
    const [error, setError] = useState("");


    const schema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
        password: yup.string().required('A senha e obrigatória')
            .min(6, 'A senha deve ter pelo 6 digitos')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async clientData => {
        try {
            const { data } = await api.post("login", {
                email: clientData.email,
                password: clientData.password
            });
            console.log(data);
            login(data);


        } catch (error) {
           
            setError("Usuário não encontrado");
        }
    }

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
            <span className="flex mt-1 justify-center text-xs text-center text-red-500">{error}</span>
            <span className="flex mt-1 justify-center text-xs text-center text-red-500">{errorMessage}</span>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        /*    onChange={handleEmailInputChange}  */
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-700 shadow-sm"
                        placeholder="Seu email"
                        required
                    />
                    <p className="errors">{errors.email?.message}</p>

                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                        Senha:
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        /*    onChange={handlePasswordInputChange} */
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-700 shadow-sm"
                        placeholder="Sua senha"
                        required
                    />
                    <p className="errors">{errors.password?.message}</p>

                </div>
                <Button 
                    type="submit"
                   /*  className="w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-700"  */
                >
                    Entrar
                </Button>
            </form>
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
