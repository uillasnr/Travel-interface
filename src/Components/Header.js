import React from "react";
import { BsPersonCircle } from 'react-icons/bs';

function Header() {
    return (
        <header className=" flex items-center h-20 justify-between absolute  w-full z-10">
            <div className="mx-10">
                <h1 className="text-white text-4xl font-black">Travel</h1>
            </div>

            <div className=" flex items-center h-20 ">
                <h3 className="text-white font-semibold text-lg">Minhas Viagens</h3>

                <div className="mx-10 flex items-center">
                    <BsPersonCircle size={40} className="mr-2 text-white" />
                    <p className="text-white text-xs">Entre ou cadastre-se</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
