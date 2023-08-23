import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from 'react-icons/bs';
import Login from "../Containers/Login";

function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <header className="flex items-center h-20 justify-between absolute w-full z-10">
        <Link to={'/'}>
            <div className="mx-4 md:mx-10"> {/* Reduz a margem nas telas menores */}
                <h1 className="text-white text-2xl md:text-4xl font-black">Travel</h1> {/* Aumenta o tamanho do texto nas telas maiores */}
            </div>
        </Link>
        <div className="  flex items-center h-20 "> {/* Esconde o conteúdo nas telas menores */}
            <Link to={`/Viagens`} style={{ textDecoration: 'none' }}>
                <h3 className="text-1xl text-white font-semibold text-lg">Minhas Viagens</h3>
            </Link>
                <div className="mx-10 flex items-center">
                    <BsPersonCircle size={35} className="mr-2 text-white" />
                    {/*  {userLoggedIn ? ( */}
                    <p className="text-white text-xs">{/* {userName} */}</p>
                    {/*   ) : ( */}
                    <div>
                        <p
                            className="text-white text-xs cursor-pointer"
                            onClick={openLoginModal}
                        >
                            Entre ou
                        </p>
                        <p
                            className="text-white text-xs cursor-pointer"
                        /*  onClick={openRegisterModal} */
                        >
                            cadastre-se
                        </p>
                    </div>
                    {/*   )} */}
                </div>


            </div>

            <Login isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
        </header>
    );
}

export default Header;
