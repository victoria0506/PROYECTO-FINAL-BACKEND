import { useState } from "react";
import "../style/TabsHome.css";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import UsedataRest from "./UsedataRest";
import RestaGet from "../services/getRestaurant";
import { Link } from "react-router-dom";

const TabsHome = () => {
  const [activeTab, setActiveTab] = useState("");
  const [associatedRestaurants, setAssociatedRestaurants] = useState([]);
  const { t } = useTranslation(); 
  const { especialidades, restaurantesEspecialidades } = UsedataRest(); 

  const specialityImages = {
    "Comida Tradicional": "https://i.pinimg.com/564x/a9/92/60/a99260c19fdc29ce4a7a7ed5632dc5dd.jpg",
    "Comida Rapida": "https://i.pinimg.com/564x/4b/a8/d9/4ba8d9cdf558a307009690e53e839842.jpg",
    "Carnes": "https://i.pinimg.com/474x/75/26/4b/75264bc72d8c89518bafe23cc84a6ad4.jpg",
    "Saludable": "https://i.pinimg.com/474x/39/a5/5e/39a55e5ed083cfe82218ec5ac10e39aa.jpg",
    "Mariscos": "https://i.pinimg.com/736x/2d/30/46/2d30462dacc0f3dd5b83c767f3eaa3de.jpg",
    "Comida Asiatica": "https://i.pinimg.com/564x/3a/ec/6a/3aec6a06a61cbab4945af2d0156600aa.jpg",
    "Pastas": "https://i.pinimg.com/564x/d2/fa/73/d2fa738fc594e75971001b7a1788d5a5.jpg"
  };

  const handleTabChange = async (especialidadId) => {
    setActiveTab((prevTab) => (prevTab === especialidadId ? "" : especialidadId))
    const filteredRestaurants = restaurantesEspecialidades.filter(
        (restaurantEspecialidad) => restaurantEspecialidad.id_especialidad === especialidadId
    );
    const restaurantIds = filteredRestaurants.map((relation) => relation.restaurante_id);
    try{
      const allRestaurants = await RestaGet()
      const restaurantsDetails = restaurantIds.map((id) => {
          return allRestaurants.find((rest) => rest.restaurante_id === id);
      }).filter(Boolean);
      setAssociatedRestaurants(restaurantsDetails);
    }catch (error){
      console.log("error");
    }
  };
  
  return (
    <article className="articlehome">
      <div className="grid__item--1of1 text-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h2 className="titulotabshome">{t("What's Your Favorite Food? Find the Perfect Restaurant:")}</h2>
          <div className="tabshome">
            {especialidades.map((especialidad) => (
              <div
                key={especialidad.id_especialidad}
                className={`tabhome ${especialidad.descripcion.toLowerCase()}`}
                onClick={() => handleTabChange(especialidad.id_especialidad)}
              >
                <div className="tab-circle">
                  <img
                    src={specialityImages[especialidad.descripcion]}
                    alt={especialidad.descripcion}
                    className={`tab-image_${especialidad.descripcion.toLowerCase().replace(/\s+/g, '_')}`}
                  />
                </div>
                <label>{especialidad.descripcion}</label>
              </div>
            ))}
          </div>
          <div className="associated-restaurants">
             {associatedRestaurants.length > 0 ? (
                associatedRestaurants.map((restaurant) => (
                  <div key={restaurant.restaurante_id}>
                    <Link to={`/Restaurant/${restaurant.restaurante_id}`}>
                      <h3>{restaurant.nombre_restaurante}</h3>
                    </Link>
                    <p>Precio Promedio: {restaurant.precio_promedio}</p>
                    <p>Calificación Promedio: {restaurant.calificacion_promedio}</p>
                    <p>Descripción: {restaurant.descripcion}</p>
                  </div>
                 ))
             ) : (
                activeTab && <p>{t('There are no associated restaurants for this specialty.')}</p>
             )}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default TabsHome;