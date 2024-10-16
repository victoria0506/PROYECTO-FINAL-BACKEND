import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import favoritosGET from "../services/FavoritosGet";
import RestaGet from "../services/getRestaurant";

const FavoritosUser = () => {
  const { usuario_id } = useParams();
  const { t } = useTranslation();
  const [favoritos, setFavoritos] = useState([]);
  console.log(favoritos);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  console.log(restaurantDetails);
  
  const obtenerFavoritos = async () => {
    const data = await favoritosGET(usuario_id);
    setFavoritos(data); 
  };

  const obtenerDetallesRestaurantes = async () => {
    const detalles = await Promise.all(
      favoritos.map(favorito => RestaGet(favorito.restaurante_id))
    );
    setRestaurantDetails(detalles);
  }

  useEffect(() => {
    obtenerFavoritos();
  }, [usuario_id]);

  useEffect(() => {
    if (favoritos.length > 0) {
      obtenerDetallesRestaurantes();
    }
  }, [favoritos])

  return (
    <div>
      <div className="user-favorites">
        <h2>{t("Tus Restaurantes Favoritos")}</h2>
        {restaurantDetails.length === 0 ? (
          <p>No tienes favoritos</p>
        ):(
          <ul>
            {restaurantDetails.map((restaurant, index) => (
              <li key={`${restaurant.restaurante_id}-${index}`}>
                <h3>{restaurant.nombre_restaurante}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritosUser;