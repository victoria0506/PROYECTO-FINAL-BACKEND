import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import '../style/paginarestaurantes.css'
import ModalMap from "./ModalMap";
import { useTranslation } from "react-i18next";
import "../style/DetailRestau.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    console.log("id:", restaurante_id);
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

    return (
        <div>
            <div>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAa9L1yFoQ_pjEdmRvVMzD97BCVNHGUTRBA&s" alt="Logo" /> */}
                {/* <video className="videoanuncio" controls autoPlay muted>
                <source src="src/img/videofaro.mp4" type="video/mp4" />
                </video> */}
                <h3>{restaurantDetail.nombre_restaurante}</h3>
                <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3>
                <ModalMap/>
                {/* <button className="AñaFavo">{t('Add to favorites')}</button> */}
            </div>
        </div>
    );
};

export default RestaurantsDetail;


