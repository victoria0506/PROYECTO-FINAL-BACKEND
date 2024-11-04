import { useState } from "react";
import "../style/TabsHome.css";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import UsedataRest from "./UsedataRest";
import RestaGet from "../services/getRestaurant";
import { Link } from "react-router-dom";

const TabsHome = () => {
  // Estado para almacenar la pestaña activa
  const [activeTab, setActiveTab] = useState("");
  // Estado para almacenar los restaurantes asociados a la pestaña activa
  const [associatedRestaurants, setAssociatedRestaurants] = useState([]);
  // Hook para la traducción
  const { t } = useTranslation(); 
  // Datos de especialidades y restaurantes asociados a las especialidades
  const { especialidades, restaurantesEspecialidades } = UsedataRest(); 

  // Imágenes asociadas a cada especialidad
  const specialityImages = {
    "Comida Tradicional": "https://i.pinimg.com/564x/a9/92/60/a99260c19fdc29ce4a7a7ed5632dc5dd.jpg",
    "Comida Rapida": "https://i.pinimg.com/564x/4b/a8/d9/4ba8d9cdf558a307009690e53e839842.jpg",
    "Carnes": "https://i.pinimg.com/474x/75/26/4b/75264bc72d8c89518bafe23cc84a6ad4.jpg",
    "Saludable": "https://i.pinimg.com/474x/39/a5/5e/39a55e5ed083cfe82218ec5ac10e39aa.jpg",
    "Mariscos": "https://i.pinimg.com/736x/2d/30/46/2d30462dacc0f3dd5b83c767f3eaa3de.jpg",
    "Comida Asiatica": "https://i.pinimg.com/564x/3a/ec/6a/3aec6a06a61cbab4945af2d0156600aa.jpg",
    "Pastas": "https://i.pinimg.com/564x/d2/fa/73/d2fa738fc594e75971001b7a1788d5a5.jpg"
  };

  // Maneja el cambio de pestaña y carga los restaurantes asociados
  const handleTabChange = async (especialidadId) => {
    // Si la pestaña activa es la misma que se clickeó, se desactiva
    if (activeTab === especialidadId) {
      setActiveTab("");
      setAssociatedRestaurants([]);
      return;
    }
    // Establece la nueva pestaña activa
    setActiveTab(especialidadId);
    
    // Filtra los restaurantes que corresponden a la especialidad seleccionada
    const filteredRestaurants = restaurantesEspecialidades.filter(
      (restaurantEspecialidad) => restaurantEspecialidad.id_especialidad === especialidadId
    );
    const restaurantIds = filteredRestaurants.map((relation) => relation.restaurante_id);
    
    try {
      // Obtiene todos los restaurantes
      const allRestaurants = await RestaGet();
      // Busca los detalles de los restaurantes asociados a la especialidad
      const restaurantsDetails = restaurantIds
        .map((id) => allRestaurants.find((rest) => rest.restaurante_id === id))
        .filter(Boolean);
      
      // Establece los restaurantes asociados en el estado
      setAssociatedRestaurants(restaurantsDetails);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <article className="articlehome">
      <div className="grid__item--1of1 text-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }} // Animación inicial
          whileInView={{ y: 0, opacity: 1 }} // Animación al estar en vista
          transition={{ duration: 0.5 }} // Duración de la animación
          viewport={{ once: false }} // Repite la animación al volver a estar en vista
        >
          <h2 className="titulotabshome">{t("What's Your Favorite Food? Find the Perfect Restaurant:")}</h2>
          <div className="tabshome">
            {especialidades.map((especialidad) => (
              <div
                key={especialidad.id_especialidad}
                className={`tabhome ${especialidad.descripcion.toLowerCase()}`} // Clase para estilo
                onClick={() => handleTabChange(especialidad.id_especialidad)} // Cambia la pestaña activa
              >
                <div className="tab-circle">
                  <img
                    src={specialityImages[especialidad.descripcion]} // Imagen de la especialidad
                    alt={especialidad.descripcion}
                    className={`tab-image_${especialidad.descripcion.toLowerCase().replace(/\s+/g, '_')}`}
                  />
                </div>
                <label>{especialidad.descripcion}</label> // Etiqueta de la especialidad
              </div>
            ))}
          </div>
          <div className="associated-restaurants">
             {associatedRestaurants.length > 0 ? (
                associatedRestaurants.map((restaurant) => (
                  <div key={restaurant.restaurante_id}>
                    <Link to={`/Restaurant/${restaurant.restaurante_id}`}>
                      <h3>{restaurant.nombre_restaurante}</h3> // Nombre del restaurante
                    </Link>
                    <p>Precio Promedio: {restaurant.precio_promedio}</p> // Precio promedio del restaurante
                    <p>Calificación Promedio: {restaurant.calificacion_promedio}</p> // Calificación promedio del restaurante
                    <p>Descripción: {restaurant.descripcion}</p> // Descripción del restaurante
                  </div>
                 ))
             ) : (
                activeTab && <p>{t('There are no associated restaurants for this specialty.')}</p> // Mensaje si no hay restaurantes asociados
             )}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default TabsHome;