import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Components/Button";
import api from "../services/api";

const customStyles = {
  overlay: {
    backgroundColor: "transparent",
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

function Register({ isOpen, onRequestClose, onRegisterSuccess }) {
  const [error, setError] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 dígitos"),
    confirmPassword: yup
      .string()
      .required("A senha é obrigatória")
      .oneOf([yup.ref("confirmPassword"), null], "As senhas devem coincidir"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    onRequestClose(); // Feche o modal de registro ao abrir o modal de login
  };

  const onSubmit = async (userData) => {
    try {
      if (userData.password !== userData.confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      const response = await api.post("cadastre-se", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });
      console.log(response);
      if (response.status === 201) {

        onRegisterSuccess();
      } else {
        setError(
          "Erro ao realizar o registro. Verifique suas informações e tente novamente."
        );
      }
    } catch (error) {
      setError(
        "Erro ao realizar o registro. Verifique suas informações e tente novamente."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="text-right">
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover-text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Cadastre-se
      </h2>
      <span className="flex mt-1 justify-center text-xs text-center text-red-500">
        {error}
      </span>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Nome:
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-border-blue-500 shadow-sm"
            placeholder="Seu nome"
            required
          />
          <p className="errors">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-border-blue-500 shadow-sm"
            placeholder="Seu email"
            required
          />
          <p className="errors">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Senha:
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-border-blue-500 shadow-sm"
            placeholder="Sua senha"
            required
          />
          <p className="errors">{errors.password?.message}</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-border-blue-500 shadow-sm"
            placeholder="Confirme sua senha"
            required
          />
          <p className="errors">{errors.confirmPassword?.message}</p>
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <span
            className="text-cyan-700 cursor-pointer"
            onClick={openLoginModal}
          >
            Faça Login
          </span>
        </p>
      </div>
    </Modal>
  );
}

export default Register;
