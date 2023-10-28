import React from "react";
import 'tailwindcss/tailwind.css';
import Header from "../Components/Header";
import TripSearch from "../Components/TripSearch";
import Beachvid from "../assets/video.mp4";
import Categories from "../Components/Categories";
import Trips from "../Components/Trips";
import Footer from "../Components/Footer";
import TripDestiny from "../Components/TripDestiny";


function Home() {
  return (
    <div>
      <section className="w-full h-screen relative">
        <Header />
        <div className="absolute top-[570px] left-0 w-full h-[180px] bg-gradient-to-b from-transparent to-white opacity-100"></div>
        <video className="w-full h-[744px] object-cover" src={Beachvid} muted autoPlay loop />
        <div className="absolute top-[565px] left-0 w-full h-[180px] bg-gradient-to-b from-transparent to-white opacity-100"></div>

        <div>
          <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <TripSearch />
          </div>
        </div>

      </section>
      <div className="absolute bottom-0 top-3/4 left-1/2 transform -translate-x-1/2">
            <Categories /> 
      </div>

      <section>
        <h2 className="text-center text-gray-700 text-3xl font-bold">Destinos mais procurados</h2>
        <Trips />
      </section>

      <div className="border-y-2 text-center text-slate-800 mb-4" />

      <section>
        <h2 className="text-center text-gray-700 text-3xl font-bold">Destinos Nacionais</h2>
        <TripDestiny />
      </section>
      
      <Footer />

    </div>


  )
}

export default Home;
