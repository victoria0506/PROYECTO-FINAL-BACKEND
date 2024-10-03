import Carousel from 'react-bootstrap/Carousel';
import { useTranslation } from 'react-i18next';

const Carrusel2 = () => {
  const { i18n } = useTranslation();

  // Imágenes de fondo para cada idioma
  const backgroundImages = {
    es: "src/img/eligeespañol.png", // Imagen en español
    en: "src/img/elige.jpeg", // Imagen en inglés
  };

  // Seleccionar la imagen de fondo según el idioma actual
  const selectedBackground = backgroundImages[i18n.language] || backgroundImages.es;

  return (
    <div className='carrusel'>
      {/* Imagen de fondo que cambia con el idioma */}
      <img className="parallax" src={selectedBackground} alt="Background" />

      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/rest.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/rest.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/rest.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br />
    </div>
  );
};

export default Carrusel2;
