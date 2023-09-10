import React, { useState } from "react";
import { ImFolderUpload } from "react-icons/im";

function InputFile({ index, onImageChange }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const image = e.target.files?.[0];

        if (image) {
            if (image.type.startsWith("image/")) {
                setFile(image);

                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result;
                    setPreview(base64String);

                    // Pass the actual File object to the parent component
                    onImageChange(index, image);
                };

                reader.readAsDataURL(image);
            } else {
                alert("Por favor, selecione um arquivo de imagem válido.");
            }
        }
    };

    return (
        <div className="relative w-44 h-40 mx-auto rounded-lg overflow-hidden shadow-lg">
            <input
                id={`file-input-${index}`} // Usar um ID exclusivo para cada InputFile
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
            />
       
            {!preview ? (
                <label
                    htmlFor={`file-input-${index}`} // Correspondente ao ID do input
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center cursor-pointer bg-opacity-80 bg-slate-500 hover:bg-slate-600 text-white transition duration-300 ease-in-out"
                >
                    <div className="flex flex-col gap-0 justify-center items-center">
                        <ImFolderUpload size={30} />
                        <span className="text-xs text-center p-3">Clique para fazer upload de uma imagem</span>
                    </div>
                </label>
            ) : (
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url(${preview})`,
                        backgroundSize: "cover",
                    }}
                />
            )}
        </div>
    );
}

export default InputFile;