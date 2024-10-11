import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import '../style/paginarestaurantes.css'

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    console.log("id:", restaurante_id);
    const [restaurantDetail, setRestaurantDetail] = useState(null);

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
                <img className="img-normalizada" src="https://visitachihuahuacapital.com/wp-content/uploads/2023/06/restaurantes-mariscos-chihuahua-9.jpg" alt="Logo" />
                <img className="logorestaurante" src="https://www.designevo.com/res/templates/thumb_small/lobster-in-circle-banner.webp" alt="" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3>
            </div>
        </div>
    );
};

export default RestaurantsDetail;


