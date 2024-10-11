import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import '../style/paginarestaurantes.css'
import ModalMap from "./ModalMap";
import { useTranslation } from "react-i18next";
import "../style/DetailRestau.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faUtensils } from "@fortawesome/free-solid-svg-icons";
// import { Alert } from "bootstrap";
import favoritosRestaurants from "../services/FavoritosPost";

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    // console.log("id:", restaurante_id);
    const usuario_id = localStorage.getItem("Usuario Autenticado_id") 
    // console.log("id usuario : ", usuario_id);
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const { t } = useTranslation();

    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurantes = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurantes) {
            throw new Error("Restaurante no encontrado");
        }else{
            setRestaurantDetail(Restaurantes);
        }
    };

    useEffect(() => {
        obtenerDetallesRestaurante();
    }, [restaurante_id]);

    if(!restaurantDetail){
        return <div>No se encontró el restaurante.</div> 
    } 

    const anadirFavoritos = async () => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            if (favoritos.includes(restaurante_id)) {
                alert("Este restaurante ya está en tus favoritos.");
            } else {
                const confirmacion = confirm("¿Deseas añadir este restaurante a tus favoritos?");
                if (confirmacion) {
                    const resultado = await favoritosRestaurants(usuario_id, restaurante_id);
                    if (resultado) {
                        favoritos.push(restaurante_id); 
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos)); 
                        alert("Restaurante añadido a tus favoritos.");
                    } else {
                        alert("Hubo un error al añadir el restaurante a tus favoritos.");
                    }
                }
            }
        } else {
            alert("Regístrate o inicia sesión si quieres añadir a favoritos.");
        }
    };

    return (
        <div>
            <div>
                <img className="img-normalizada" src="https://visitachihuahuacapital.com/wp-content/uploads/2023/06/restaurantes-mariscos-chihuahua-9.jpg" alt="Logo" />
                <img className="logorestaurante" src="https://www.designevo.com/res/templates/thumb_small/lobster-in-circle-banner.webp" alt="" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3>
                <ModalMap/>
                <div>
                <button className="AñaFavo" onClick={anadirFavoritos}>{t('Add to favorites')}</button>
                <button className="Misfavo">{t('')}</button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsDetail;

