import Carousel from 'react-bootstrap/Carousel';

const Carrusel2 = () => {
  return (
    <div className='carrusel'>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className="overlay"></div> {/* Overlay para oscurecer la imagen */}
          <img
            className="d-block w-100"
            src="https://ik.imagekit.io/sox1oxatj/headercayuga__1__o5ms7lhnD.jpeg?updatedAt=1730483755885"
            alt="First slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content-home">
              <h3 className='textocarruselhome'>Disfruta de la auténtica experiencia gastronómica de Puntarenas, 
                donde el ceviche <br /> es solo
                 el comienzo de un viaje culinario por los mejores restaurantes de la costa.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/6b/f1/2a/6bf12a8ef07ce770de444e734ad758b2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content-home">
              <h3 className='textocarruselhome'>Haz de cada comida en Puntarenas una experiencia memorable, llena de sabor y alegría.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1465512585831-856a0bfd5e0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHVudGFyZW5hcyUyMFByb3ZpbmNlJTJDJTIwUHVudGFyZW5hcyUyQyUyMENvc3RhJTIwUmljYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Third slide"
          />
          <Carousel.Caption className="caption-centered">
            <div className="caption-content-home">
              <h3 className='textocarruselhome'>Disfruta de una deliciosa comida con vista al mar, <br />donde cada plato es un homenaje a la frescura del océano.</h3>

            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
    </div>
  );
};
export default Carrusel2;
