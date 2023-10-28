import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from 'react-icons/bs';
import Login from "../Containers/Login";
import { useUser } from "../hooks/UserContext"

function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <header className="flex items-center h-20 justify-between absolute w-full z-10">
            <Link to={'/'}>
                <div className="mx-4 md:mx-10">
                    <h1 className="text-white text-2xl md:text-4xl font-black">Travel</h1>
                </div>
            </Link>

            <div className="flex gap-3 items-center h-20">
                <Link to={`/Viagens`} style={{ textDecoration: 'none' }}>
                    <h3 className="text-white text-xs font-semibold sm:flex-col
                 w-10 pr-12 sm:flex md:w-full md:pr-1 hover:text-gray-600">Minhas Viagens</h3>
                </Link>

                <div className="gap-1 mr-10 flex items-center">
                    <BsPersonCircle size={35} className="mr-2 text-white" />
                    {user ? (
                        <div>
                            <p className="text-white text-xs">Olá {user.user.name}</p>
                            <p
                                className="text-xs text-red-800 cursor-pointer font-black"
                                onClick={handleLogout}
                            >
                                Sair
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p
                                className="text-white text-xs hover:text-gray-600 cursor-pointer"
                                onClick={openLoginModal}
                            >
                                Entre ou
                            </p>
                            <p
                                className="text-white text-xs  "
                            >
                                cadastre-se
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {!user && (
                <Login isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
            )}
        </header>
    );
}

export default Header;
