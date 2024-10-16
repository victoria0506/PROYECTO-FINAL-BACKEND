
import '../style/CarouselPlatillos.css';

const CarouselPlatillos = () => {
  const items = [
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8f-twWkEpnn4KxYBYT9PXuSIwo-f9FrDYQ&s",
      title: "Pollito",
      subtitle: "taz"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1785001/pexels-photo-1785001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },
    {
      imgSrc: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1071882/pexels-photo-1071882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Descriptive Title",
      subtitle: "Date and Duration"
    },
    {
        imgSrc: "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
