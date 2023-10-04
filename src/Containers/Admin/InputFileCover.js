import React, { useState } from "react";
import { ImFolderUpload } from "react-icons/im";

function InputFileCover({ onImageCoverChange }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const imageCover = e.target.files?.[0];

        if (imageCover) {
            if (imageCover.type.startsWith("image/")) {
                setFile(imageCover);

                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result;
                    setPreview(base64String);
                    onImageCoverChange(imageCover, base64String);
                };

                reader.readAsDataURL(imageCover);
            } else {
                alert("Por favor, selecione um arquivo de imagem válido.");
            }
        }
    };

    return (
        <div
            className="relative w-auto h-72 mx-auto rounded-lg overflow-hidden shadow-lg"
            style={{
                backgroundImage: `url(${preview})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <input
                id="file-input-cover"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
            />
            {!preview && (
                <label
                    htmlFor="file-input-cover"
                    className="absolute inset-0 w-full h-full flex flex-col justify-center
                     items-center cursor-pointer bg-opacity-80 bg-slate-500 hover:bg-slate-600
                      text-white transition duration-300 ease-in-out"

                ><div className="flex flex-col justify-center items-center">
                        <ImFolderUpload size={30} />
                        <h3 className="font-bold text-center pt-3 ">Imagem de Capa</h3>
                        <span className="text-xs text-center p-3"> Clique para fazer upload de uma imagem</span>
                    </div>
                </label>
            )}
        </div>
    );
}

export default InputFileCover;
