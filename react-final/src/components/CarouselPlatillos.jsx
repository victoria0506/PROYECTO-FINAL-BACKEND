import { useTranslation } from 'react-i18next';
import '../style/CarouselPlatillos.css';
import { useEffect, useState } from 'react';
import PlatillosGet from '../services/PlatillosGet';

const CarouselPlatillos = ({restaurante_id}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([])

  useEffect(() => {
    const PlatillosObten = async () => {
      try {
        const data = await PlatillosGet();      
        if (Array.isArray(data)) {
          const filteredPlatillos = data.filter(platillo => 
            platillo.restaurante_id === Number(restaurante_id)
          );
          const platilloItems = filteredPlatillos.flatMap(platillo => platillo.platillo_urls);
          setItems(platilloItems);
        } else {
          console.error("Data received is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    PlatillosObten();
  }, [restaurante_id]);
  

  return (
    <div className="carousel-section2">
      <h2 className="categories__title">{t("Highlights and Favorites")}</h2>
      <div className="carousel__container">
        {items.map((item, index) => (
          <div className="carousel-item2" key={index}>
            <img
              className="carousel-item__img"
              src={item.imgSrc} 
            />
            <div className="carousel-item__details">
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className="carousel-item__details--title">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPlatillos;
