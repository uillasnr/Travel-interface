import React, { useEffect, useState } from "react";

function Highlihts({ onImageHighlihtsClick }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const imagesHighlihts = [
    {
      title: "Estacionamento",
      url: "https://img.icons8.com/ios/50/000000/car-roof-box.png",
    },
    {
      title: "Wi-Fi",
      url: "https://img.icons8.com/windows/50/000000/wifi--v1.png",
    },
    {
      title: "TV",
      url: "https://img.icons8.com/ios/50/000000/retro-tv.png",
    },
    {
      title: "Piscina",
      url: "https://img.icons8.com/ios/50/000000/lap-pool.png",
    },
    {
      title: "Cozinha",
      url: "https://img.icons8.com/ios/50/000000/knife-and-spatchula.png",
    },
    {
      title: "Ferro de passar",
      url: "https://img.icons8.com/ios/50/000000/iron.png",
    },
    {
      title: "Banheira",
      url: "https://img.icons8.com/ios/50/000000/shower-and-tub.png",
    },
    {
      title: "Máquina de lavar",
      url: "https://img.icons8.com/dotty/50/000000/washing-machine.png",
    },
    {
      title: "Jacuzzi privativa",
      url: "https://img.icons8.com/external-goofy-line-kerismaker/50/000000/external-Jacuzzi-hotel-service-goofy-line-kerismaker.png",
    },
    {
      title: "Ar-condicionado",
      url: "https://img.icons8.com/ios/50/000000/air-conditioner.png",
    },
    {
      title: "Extintor de incêndio",
      url: "https://img.icons8.com/ios/50/000000/fire-extinguisher.png",
    },
    {
      title: "Espaço de trabalho exclusivo",
      url: "https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/50/000000/external-desk-coworking-space-xnimrodx-lineal-xnimrodx-3.png",
    },
    {
      title: "Academia",
      url: "https://img.icons8.com/ios/50/000000/barbell.png",
    },
    {
      title: "Aquecedor",
      url: "https://img.icons8.com/dotty/50/000000/heating-radiator--v2.png",
    },
    {
      title: "Acesso à praia",
      url: "https://img.icons8.com/external-outline-icons-maxicons/50/000000/external-beach-summer-holiday-outline-outline-icons-maxicons-11.png",
    },
    {
      title: "Área de jantar externa",
      url: "https://img.icons8.com/ios/50/000000/restaurant-table.png",
    },
    {
      title: "Churrasqueira",
      url: "https://img.icons8.com/ios/50/000000/weber.png",
    },
    {
      title: "Vista para as montanhas",
      url: "https://img.icons8.com/ios/50/000000/trail--v2.png",
    },
    {
      title: "Esqui",
      url: "https://img.icons8.com/ios/50/000000/skiing.png",
    },
    {
      title: "Lareira interna",
      url: "https://img.icons8.com/external-wanicon-lineal-wanicon/64/000000/external-fireplace-furniture-and-household-wanicon-lineal-wanicon.png",
    },
  ];



  const handleImageClickHighlihts = (imageUrl, title) => {
    // Verifique se a imagem já está selecionada
    if (selectedImages.some((img) => img.url === imageUrl)) {

      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((img) => img.url !== imageUrl)
      );
    } else {

      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        { url: imageUrl, title },
      ]);
    }
  };

  useEffect(() => {
    onImageHighlihtsClick(selectedImages);

  }, [selectedImages]);

  return (
    <div className="grid grid-cols-5 gap-3 bg-opacity-60 bg-slate-200 p-3.5 rounded-l-lg">
      {imagesHighlihts.map((image, index) => (
        <div key={index} className="text-center">

          <img
            src={image.url}
            alt={`image-${index}`}
            onClick={() => handleImageClickHighlihts(image.url, image.title)} // Passar o título aqui
            className={`cursor-pointer bg-white rounded-lg w-20 p-3.5
            ${selectedImages.some((img) => img.url === image.url) ? "border-4 border-cyan-700" : ""
              }`} />

          <p className="text-xs text-center items-center mt-1">{image.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Highlihts;
