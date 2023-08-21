import React from "react";
import 'tailwindcss/tailwind.css';
import Header from "../Components/Header";
import Search from "../Components/Search";
import Beachvid from "../assets/video.mp4";
import Categories from "../Components/Categories";
import Trips from "../Components/Trips";
import Footer from "../Components/Footer";


function Home() {
  return (
    <div>
      <section className="w-full h-screen relative">
        <Header />
        <div className="w-full h-40 absolute top-3/4 left-0 bg-gradient-to-b from-transparent to-white opacity-100"></div>
        <video className="w-full h-[744px] object-cover" src={Beachvid} muted autoPlay loop />


        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl  sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl w-full font-bold text-center">
            Pacotes de viagem incríveis te esperam
          </h1>
          <h2 className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl xs:text-2xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl w-full font-bold text-center mt-4">
            Nossas promoções imbatíveis!
          </h2>
        </div>



        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Search />
        </div>

      </section>
      <div className="absolute bottom-0 top-3/4 left-1/2 transform -translate-x-1/2">
          <Categories />  
      </div>

      <section>
        <h2 className="text-center text-gray-700 text-3xl font-bold">Destinos mais procurados</h2>
        <Trips />
      </section>
      <Footer />

    </div>


  )
}

export default Home;
