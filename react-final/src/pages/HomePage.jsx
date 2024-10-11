import Home from "../components/Home"
import Carrusel2 from "../components/Carrusel"
import VideoAnuncio from "../components/VideoAnuncio"
import CardsRestaurantes from "../components/CardRestaurantes"
import ModalMap from "../components/ModalMap"
import Nav from "../components/Nav"
import TextoBajoHome from "../components/TextoBajoHome"

function HomePage() {
  return (
    <div>
      <Nav/>
     <Home/>
     <TextoBajoHome/>
     <Carrusel2/>
     <VideoAnuncio/>
     <CardsRestaurantes/>
     <ModalMap/>
    </div>
  )
}

export default HomePage