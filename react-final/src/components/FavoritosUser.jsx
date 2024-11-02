import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import favoritosGET from "../services/FavoritosGet";
import RestaGet from "../services/getRestaurant";

const FavoritosUser = () => {
  const { usuario_id } = useParams();
  const { t } = useTranslation();
  const [favoritos, setFavoritos] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  const obtenerFavoritos = async () => {
    const data = await favoritosGET(usuario_id);
    setFavoritos(data); 
  };

  const obtenerDetallesRestaurantes = async () => {
    const restaurantIds = favoritos.map(favorito => favorito.restaurante_id);
    // Si no hay IDs, no hacemos la llamada
    if (restaurantIds.length === 0) return;

    const detalles = await Promise.all(
      restaurantIds.map(async (restaurante_id) => {
        const restauranteArray = await RestaGet(restaurante_id);
        console.log("Datos recibidos de RestaGet:", restauranteArray);
        return restauranteArray; 
      })
    );

    // Filtrar los detalles para asegurarnos de que solo se incluyan restaurantes válidos
    const todosLosRestaurantes = detalles.flat().filter(Boolean); 
    setRestaurantDetails(todosLosRestaurantes); 
  };
  
  useEffect(() => {
    obtenerFavoritos();
  }, []);

  useEffect(() => {
    // Solo llamamos a obtenerDetallesRestaurantes si hay favoritos
    if (favoritos.length > 0) {
      obtenerDetallesRestaurantes();
    }
  }, [favoritos]);

  return (
    <div>
      <div className="user-favorites">
        <h2>{t("Tus Restaurantes Favoritos")}</h2>
        {restaurantDetails.length === 0 ? (
          <p>{t("No tienes favoritos")}</p>
        ) : (
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

