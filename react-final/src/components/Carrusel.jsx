import Carousel from 'react-bootstrap/Carousel';

const Carrusel = () => {
  return (
    <div className='carrusel'>
 
    

      <img className="parallax" src="src/img/textoadi4.png" alt="" />
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src/img/rest.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src/img/rest.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src/img/rest.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br />
    </div>
  )
}
export default Carrusel