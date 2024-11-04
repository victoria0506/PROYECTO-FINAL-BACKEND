// import { useTranslation } from "react-i18next";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import favoritosGET from "../services/FavoritosGet";
// import RestaGet from "../services/getRestaurant";

// const FavoritosUser = () => {
//     const { usuario_id } = useParams();
//     const { t } = useTranslation();
//     const [favoritos, setFavoritos] = useState([]);
//     const [restaurantDetails, setRestaurantDetails] = useState([]);

//     const obtenerFavoritos = async () => {
//         try {
//             const data = await favoritosGET(usuario_id);
//             setFavoritos(data);
//         } catch (error) {
//             console.error("Error al obtener favoritos:", error);
//         }
//     };

//     const obtenerDetallesRestaurantes = async () => {
//         try {
//             const uniqueRestaurantIds = [...new Set(favoritos.map(fav => fav.restaurante_id))];
//             const detalles = await Promise.all(
//                 uniqueRestaurantIds.map(async (restaurante_id) => {
//                     const restauranteData = await RestaGet(restaurante_id);
//                     return restauranteData[0]; 
//                 })
//             );
//             setRestaurantDetails(detalles.filter(Boolean));
//             console.log("Detalles de restaurantes después de la obtención:", detalles); 
//         } catch (error) {
//             console.error("Error al obtener detalles de restaurantes:", error);
//         }
//     };

//     useEffect(() => {
//         obtenerFavoritos(); 
//     }, []);

//     useEffect(() => {
//         if (favoritos.length > 0) {
//             obtenerDetallesRestaurantes();
//         } else {
//             setRestaurantDetails([]); 
//         }
//     }, [favoritos]);
//     console.log("Detalles de restaurantes después de la obtención:", restaurantDetails);

//     return (
//         <div>
//             <div className="user-favorites">
//                 <h2>{t("Tus Restaurantes Favoritos")}</h2>
//                 {restaurantDetails.length === 0 ? (
//                     <p>{t("No tienes favoritos")}</p>
//                 ) : (
//                     <ul>
//                         {restaurantDetails.map((restaurant) => (
//                             <li key={restaurant.restaurante_id}> 
//                                 <h3>{restaurant.nombre_restaurante || "Nombre no disponible"}</h3>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );  
// };

// export default FavoritosUser;