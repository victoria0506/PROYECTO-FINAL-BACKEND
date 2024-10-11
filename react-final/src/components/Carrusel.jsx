import Carousel from 'react-bootstrap/Carousel';
//import { useTranslation } from 'react-i18next';
const Carrusel2 = () => {
//const { i18n } = useTranslation();
  // Imágenes de fondo para cada idioma
  /*const backgroundImages = {
    es: "src/img/eligeespañol.png", // Imagen en español
    en: "src/img/elige.jpeg", // Imagen en inglés
  };*/
  // Seleccionar la imagen de fondo según el idioma actual
  //const selectedBackground = backgroundImages[i18n.language] || backgroundImages.es;
  return (
    <div className='carrusel'>
   
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className="overlay"></div> {/* Overlay para oscurecer la imagen */}
          <img
            className="d-block w-100"
            src="https://www.denia.com/wp-content/uploads/2012/07/mariscos-restaurante-mena.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content">
              <h3>¿Eres amantes de los mariscos?</h3>
              <p style={{color: "white"}}>Aqui hay algunas opciones donde podrás encontrar lo que buscas. </p>
              <button className="btn btn-primary">Descubrir</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="src/img/rest.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content">
              <h3>Segunda Imagen</h3>
              <p style={{color: "white"}}>Este es un breve texto para describir la segunda imagen.</p>
              <button className="btn btn-primary">Ver más</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="src/img/rest.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content">
              <h3>Tercera Imagen</h3>
              <p style={{color: "white"}}>Este es un breve texto para describir la tercera imagen.</p>
              <button className="btn btn-primary">Ver más</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
    </div>
  );
};
export default Carrusel2;
