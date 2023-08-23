import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';

function TripsHeader({ Header }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Função para atualizar a imagem principal com base no URL da imagem clicada.
    const updateMainImage = (index) => {
        setCurrentImageIndex(index);
    }

    //array com todas as imagens, incluindo a coverImage.
    const allImages = Header && Header.imagesUrl ? [Header.coverImage, ...Header.imagesUrl] : [];

    return (
        <div className="flex w-full flex-col ">
            <div className="lg:hidden px-5">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={true}
                    pagination={true}
                    modules={[Navigation, Pagination]}
                    // Definindo o índice inicial com base na imagem atual.
                    initialSlide={currentImageIndex}
                    // Adicionando um evento para atualizar o índice da imagem.
                    onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                >
                    {allImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className="mb-5 h-[350px] w-full mt-28  object-cover"
                                src={image}
                                alt={Header && Header.name}
                                width={393}
                                height={208}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/*     img web */}
            <div className="mt-10 hidden max-h-[450px] grid-cols-[2fr,1fr,1fr,1fr] grid-rows-2 gap-4 rounded-sm px-5 md:order-2 lg:grid">
                <img
                    className="col-span-2 row-start-1 row-end-3 hidden h-[450px] w-full rounded-xl object-cover lg:flex"
                    src={allImages[currentImageIndex]}
                    alt={Header && Header.name}
                    width={800}
                    quality={100}
                    height={420}
                />
                {allImages.map((image, index) => {
                    return (
                        <img
                            key={index}
                            className="hidden h-full w-full rounded-xl object-cover cursor-pointer lg:flex"
                            src={image}
                            alt={Header && Header.name}
                            width={400}
                            height={200}
                            onClick={() => updateMainImage(index)}
                        />
                    )
                })}
            </div>
            <div className="flex flex-col gap-2 px-5 md:order-1 md:mt-10">
                <div className="flex items-center gap-3">
                    <Link className="w-max transition-all hover:scale-110" to={'/'}>
                        <FiArrowLeftCircle size={30} />
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-700 lg:text-3xl">
                        {Header.name}
                    </h2>
                </div>

                <div className="flex items-center gap-2 lg:gap-5">
                    <div className="flex h-5 w-5 items-center lg:h-8 lg:w-8">
                        <ReactCountryFlag
                            countryCode={Header.countryCode}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            svg
                        />
                    </div>
                    <p className="text-xs font-medium  text-gray-600  underline lg:text-lg">
                        {Header.location}
                    </p>
                </div>
                <p className="flex items-center gap-2 text-xs font-normal text-grayPrimary lg:hidden">
                    <span className="text-lg font-semibold text-primaryLighter ">
                        R$
                        {Header.pricePerDay && Header.pricePerDay.toString()}
                    </span>{' '}
                    por noite
                </p>
            </div>
        </div>
    )
}

export default TripsHeader;
