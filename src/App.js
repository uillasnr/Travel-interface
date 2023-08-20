import React from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";
import Beachvid from "../src/assets/video.mp4"
import Categories from "./Components/Categories";
import Trips from "./Components/Trips";

function App() {
  return (
    <div>
      <section className="w-full h-screen relative">
        <Header />
        <div className="w-full h-40 absolute top-3/4 left-0 bg-gradient-to-b from-transparent to-white opacity-100"></div>
        <video className="w-full h-full object-cover" src={Beachvid} muted autoPlay loop />
        <h1 className="absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          Pacotes de viagem incríveis te esperam
        </h1>
        <h2 className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
          Nossas promoções imbatíveis!
        </h2>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Search />
        </div>
       
      </section>
      <div className="absolute bottom-0 top-3/4 left-1/2 transform -translate-x-1/2">
        <Categories />
      </div>

      <section>
        <h2 className="text-center text- text-3xl font-bold">Destinos mais procurados</h2>
      <Trips />
      </section>
    </div>
  )
}

export default App;
