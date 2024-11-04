import { useState } from "react";
import Home from "../components/Home";
import Carrusel2 from "../components/Carrusel";
import CardsRestaurantes from "../components/CardRestaurantes";
import Nav from "../components/Nav";
import TabsHome from "../components/TabsHome";
import CarouselHomePlatosDest from "../components/CarouselHomePlatosDest";

function HomePage() {
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  return (
    <div>
      <Nav />
      <Home />
      <TabsHome setEspecialidadSeleccionada={setEspecialidadSeleccionada} />
      <Carrusel2 />
      <CarouselHomePlatosDest />
     
      <CardsRestaurantes especialidadSeleccionada={especialidadSeleccionada} />
    </div>
  );
}

export default HomePage;
