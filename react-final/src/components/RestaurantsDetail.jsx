import { useState } from "react"; // Importamos useState para manejar el estado del menú
import MenuRestaurantes from "./MenuRestaurantes"; // Importamos el componente del menú
import ModalMap from "./ModalMap";
import { useParams } from "react-router-dom";
import RestaGet from "../services/getRestaurant";
import '../style/paginarestaurantes.css';
import { useTranslation } from "react-i18next";
import "../style/DetailRestau.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";


const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const { t } = useTranslation();

    const [showMenu, setShowMenu] = useState(false); // Estado para controlar la visibilidad del menú

    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurantes = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurantes) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurantes);
        }
    };

    useEffect(() => {
        obtenerDetallesRestaurante();
    }, [restaurante_id]);

    if (!restaurantDetail) {
        return <div>No se encontró el restaurante.</div>;
    }

    // Función para mostrar/ocultar el menú
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <div>
                <img className="img-normalizada" src="https://visitachihuahuacapital.com/wp-content/uploads/2023/06/restaurantes-mariscos-chihuahua-9.jpg" alt="Logo" />
                <img className="logorestaurante" src="https://www.designevo.com/res/templates/thumb_small/lobster-in-circle-banner.webp" alt="Logo del Restaurante" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    Hotel Las Brisas, ubicado en Puntarenas, es el lugar perfecto para
                    disfrutar de mariscos frescos y una cocina costarricense en un ambiente acogedor junto al océano.
                </h4>
                <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3>

                {/* Imagen que al hacer clic muestra el menú */}
                <img 
                    className="menu-image" 
                    src="/src/img/menu.png" // Cambia esto por la URL de tu imagen del menú
                    alt="Ver Menú"
                    onClick={toggleMenu} // Manejador del clic
                />

                {/* Mostrar menú solo si showMenu es true */}
                {showMenu && <MenuRestaurantes />}

                <ModalMap />
            </div>
        </div>
    );
};

export default RestaurantsDetail;



