
import '../style/CarouselPlatillos.css';

const CarouselPlatillos = () => {
  const items = [
    {
      imgSrc: "/src/img/hamburguesacayuga.jpeg",
      title: "Hamburguesa Cayuga",
      subtitle: ""
    },
    {
      imgSrc: "/src/img/hamburguesacayuga.jpeg",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },
    {
      imgSrc: "/src/img/hamburguesacayuga.jpeg",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },
    {
      imgSrc: "/src/img/hamburguesacayuga.jpeg",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },

  ];

  return (
    <div className="carousel-section2">
      <h2 className="categories__title">Destacados y favoritos</h2>
      <div className="carousel__container">
        {items.map((item, index) => (
          <div className="carousel-item2" key={index}>
            <img
              className="carousel-item__img"
              src={item.imgSrc}
              alt="carousel item"
            />
            <div className="carousel-item__details">
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className="carousel-item__details--title">{item.title}</h5>
              <h6 className="carousel-item__details--subtitle">{item.subtitle}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPlatillos;
