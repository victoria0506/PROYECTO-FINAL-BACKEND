import '../style/CarouselHomePlatosDest.css';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PlatillosGet from '../services/PlatillosGet';

const CarouselHomePlatosDest = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([])

  useEffect(() => {
    const DestacadosPlati = async () => {
      try {
        const data = await PlatillosGet();
        if (Array.isArray(data)) {
          const shuffledPlatillos = data.sort(() => 0.5 - Math.random());
          const platilloItems = shuffledPlatillos.flatMap(platillo => platillo.platillo_urls);
          setItems(platilloItems.slice(0, 6)); 
        } else {
          console.error("Data received is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    DestacadosPlati();
  }, []);

  const carouselRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <motion.div
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: false }} // Allows the animation to trigger each time the element comes into view
    >
    <div className="carousel-section-unique">
      <h1 className="carousel-title-unique">{t('STAR DISH')}</h1>
      <h2 className="carousel-subtitle-unique">{t("If you're unsure about what to eat, take a look at these selected dishes from our best restaurants.")}</h2>
      <div className="carousel-navigation-unique">
        <button className="carousel-btn-left-unique" onClick={scrollLeft}>
        «
        </button>
        <div className="carousel-container-unique" ref={carouselRef}>
          {items.map((item, index) => (
            <div className="carousel-item-unique" key={index} onClick={() => openModal(item)}>
              <img
                className="carousel-img-unique"
                src={item.imgSrc}
                alt={item.title}
              />
              <div className="carousel-details-unique">
                <div className="carousel-controls-unique">
                  <span className="fas fa-play-circle"></span>
                  <span className="fas fa-plus-circle"></span>
                </div>
                <h5 className="carousel-title-item-unique">{item.title}</h5>
                <h6 className="carousel-subtitle-item-unique">{item.subtitle}</h6>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn-right-unique" onClick={scrollRight}>
        »
        </button>
      </div>

    {isModalOpen && (
    <div className="modal-unique">
        <div className="modal-content-unique">
            <span className="close-modal-unique" onClick={closeModal}>
                &times;
            </span>
            <img src={selectedItem.imgSrc} alt={selectedItem.title} className="modal-img-unique"/>
        </div>
    </div>
    )}
    </div>
    </motion.div>
  );
};

export default CarouselHomePlatosDest;