import { useState } from "react";
import Home from "../components/Home";
import Carrusel2 from "../components/Carrusel";
import CardsRestaurantes from "../components/CardRestaurantes";
import Nav from "../components/Nav";
import TabsHome from "../components/TabsHome";
import CarouselHomePlatosDest from "../components/CarouselHomePlatosDest";

function HomePage() {


  return (
    <div>
      <Nav />
      <Home />
      <TabsHome/>
      <Carrusel2 />
      <CarouselHomePlatosDest />
      <CardsRestaurantes/>
    </div>
  );
}

export default HomePage;
