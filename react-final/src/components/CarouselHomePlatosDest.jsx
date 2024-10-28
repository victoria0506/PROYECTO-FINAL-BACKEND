import '../style/CarouselHomePlatosDest.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const CarouselHomePlatosDest = () => {
  const { t } = useTranslation();

  const items = [
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8f-twWkEpnn4KxYBYT9PXuSIwo-f9FrDYQ&s",
      title: "Pollito",
      subtitle: "De Restaurante Cayu",
      description: "Delicious grilled chicken with spices."
    },
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXGD_KBiL40xZo1zMEjp6MaByHZlYh6DLZw&s",
      title: "Pizza",
      subtitle: "De Restaurante So",
      description: "Traditional Italian pizza with fresh ingredients."
    },
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6JkqU_xH5kJmcTzlPhfbK1Nl8I7t753gyg&s",
      title: "Sushi",
      subtitle: "De Restaurante ariGATO",
      description: "Fresh sushi rolls with wasabi and soy sauce."
    },
    {
      imgSrc: "https://images.pexels.com/photos/1071882/pexels-photo-1071882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Steak",
      subtitle: "De Restaurante WQ",
      description: "Juicy grilled steak cooked to perfection."
    },
    {
      imgSrc: "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Salad",
      subtitle: "Healthy",
      description: "Fresh salad with organic ingredients."
    },
  ];

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
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.subtitle}</p>
            <p>{selectedItem.description}</p>
            <img src={selectedItem.imgSrc} alt={selectedItem.title} className="modal-img-unique"/>
        </div>
    </div>
)}

   
    </div>
    </motion.div>
  );
};

export default CarouselHomePlatosDest;









// import '../style/CarouselHomePlatosDest.css'; // Importar el CSS de Flickity
// import Flickity from 'react-flickity-component';
// import 'flickity/css/flickity.css'; // Importar el CSS de Flickity

// const flickityOptions = {
//   wrapAround: true,
// };

// const CarouselHomePlatosDest = () => {
//   return (
//     <Flickity
//       className={'gallery'}
//       elementType={'div'}
//       options={flickityOptions}
//       disableImagesLoaded={false}
//       reloadOnUpdate={true}
//       static={true}
//     >
//       <div className="gallery-cell"></div>
//       <div className="gallery-cell">2</div>
//       <div className="gallery-cell">3</div>
//       <div className="gallery-cell">4</div>
//       <div className="gallery-cell">5</div>
//     </Flickity>
//   );
// };

// export default CarouselHomePlatosDest;
