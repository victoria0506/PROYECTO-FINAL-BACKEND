import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import fetchImagen from "../services/imageGet"; // Asegúrate de importar el servicio de imágenes
import "../style/cardRestaurantes.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CardsRestaurantes = ({ especialidadSeleccionada }) => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [imagenesRestaurantes, setImagenesRestaurantes] = useState({}); // Estado para almacenar las imágenes
  const { t } = useTranslation();

  // Función para obtener los detalles de los restaurantes y sus imágenes
  const obtenerRestaurantConImagenes = async () => {
    const restaurantObte = await RestaGet();
    setRestaurantes(restaurantObte);

    // Obtiene las imágenes para cada restaurante
    const imagenes = {};
    for (let resta of restaurantObte) {
      const img = await fetchImagen(resta.restaurante_id);
      if (img && img.length > 0) {
        imagenes[resta.restaurante_id] = img[0].url_img; // Usa la primera imagen como perfil
      }
    }
    setImagenesRestaurantes(imagenes);
  };

  useEffect(() => {
    obtenerRestaurantConImagenes();
  }, []);

  const restaurantesFiltrados = especialidadSeleccionada
    ? restaurantes.filter((restau) => restau.especialidad === especialidadSeleccionada)
    : restaurantes;

  return (
    <div className="maincontainer">
      <h1>{t('Discover your next favorite restaurant.')}</h1>
      <div className="container-cards">
        {restaurantesFiltrados.map((restau) => (
          <div key={restau.restaurante_id}>
            <article className="card">
              <img
                className="card__background"
                src={imagenesRestaurantes[restau.restaurante_id] || "/src/img/lasbrisasheader.jpeg"}
                alt={`Photo of ${restau.nombre_restaurante}`}
              />
              <img
                className="card__profile-icon"
                src={imagenesRestaurantes[restau.restaurante_id] || "/src/img/images.jpg"}
                alt="Restaurant Profile"
              />
              <div className="card__content flow">
                <div className="card__content--container flow">
                  <h2 className="card__title">{restau.nombre_restaurante}</h2>
                  <p className="card__description">
                    <strong>{t('Specialty')}: </strong>{restau.especialidad}<br />
                    <strong>{t('Rating')}: </strong>{restau.calificacion_promedio}<br />
                    <strong>{t('Capacity')}: </strong>{restau.capacidad}<br />
                  </p>
                </div>
                <button className="card__button">
                  <Link to={`/Restaurant/${restau.restaurante_id}`}>{t('See more')}</Link>
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsRestaurantes;


