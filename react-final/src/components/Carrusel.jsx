import Carousel from 'react-bootstrap/Carousel';

const Carrusel2 = () => {
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
          
              <h2 className='texto2carrusel' style={{color: "white"}}>Si te encanta el marisco, no te puedes perder estos restaurantes que son famosos por ofrecer los platillos más frescos del océano.</h2>
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
