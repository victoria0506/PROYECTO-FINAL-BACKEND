import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import fetchImagen from "../services/imageGet";
import "../style/cardRestaurantes.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CardsRestaurantes = ({ especialidadSeleccionada }) => {
  const [restaurantes, setRestaurantes] = useState([]);
  const { t } = useTranslation();

  const obtenerRestaurant = async () => {
    const restaurantObte = await RestaGet();
    // Obtener ambas imágenes para cada restaurante
    const restaurantesConImagen = await Promise.all(
      restaurantObte.map(async (restau) => {
        const imagenes = await fetchImagen(restau.restaurante_id);
        return {
          ...restau,
          imagen: imagenes.length > 0 ? imagenes[0].url_img : "/src/img/default.jpg", // Logo del restaurante
          header: imagenes.length > 0 ? imagenes[0].url_header : "/src/img/default-header.jpg", // Imagen de encabezado
          horarioApertura: restau.horario_apertura,
          horarioCierre: restau.horario_cierre,
        };
      })
    );

    setRestaurantes(restaurantesConImagen);
  };

  useEffect(() => {
    obtenerRestaurant();
  }, []);

  const restaurantesFiltrados = especialidadSeleccionada
    ? restaurantes.filter((restau) => restau.especialidad === especialidadSeleccionada)
    : restaurantes;

    const verificarDisponibilidad = (horarioApertura, horarioCierre) => {
      const ahora = new Date();
      const horaActual = `${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}`;
      return horaActual >= horarioApertura && horaActual <= horarioCierre;
    };

  return (
    <div className="maincontainer">
      <h1 className="titulocards">{t('Discover your next favorite restaurant.')}</h1>
      <div className="container-cards">
        {restaurantesFiltrados.map((restau, index) => {
          const disponible = verificarDisponibilidad(restau.horarioApertura, restau.horarioCierre);

          return (
            <div key={index}>
              <Link to={`/Restaurant/${restau.restaurante_id}`}>
              <article className="card">
                <img
                  className="card__background"
                  src={restau.header}  // Usamos la imagen de encabezado
                  alt={`Header of ${restau.nombre_restaurante}`}
                />
                <img
                  className="card__profile-icon"
                  src={restau.imagen} // Usamos el logo del restaurante
                  alt={`Logo of ${restau.nombre_restaurante}`}
                />
                <div className="card__content flow">
                  <div className="card__content--container flow">
                    <h2 className="card__title">{restau.nombre_restaurante}</h2>
                    <p className="card__description">
                      <strong>{t('Specialty')}: </strong>{restau.especialidad}<br />
                      <strong>{t('Rating')}: </strong>{restau.calificacion_promedio}<br />
                      <strong>{t('Capacity')}: </strong>{restau.capacidad}<br />
                      <strong style={{ color: disponible ? 'green' : 'red' }}>
                        {disponible ? t('Available') : t('Closed')}
                      </strong>
                    </p>
                  </div>
                
                    <Link to={`/Restaurant/${restau.restaurante_id}`}></Link>
                
                </div>
              </article>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsRestaurantes;

