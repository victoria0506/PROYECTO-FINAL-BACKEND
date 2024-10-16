import { useState, useEffect } from "react"; 
import MenuRestaurantes from "./MenuRestaurantes"; 
import ModalMap from "./ModalMap";
import { useParams } from "react-router-dom";
import RestaGet from "../services/getRestaurant";
import '../style/paginarestaurantes.css';
import { useTranslation } from "react-i18next";
import "../style/DetailRestau.css";
import favoritosRestaurants from "../services/FavoritosPost";
import deleteRestau from "../services/DELETEFAVO";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Modal } from "react-bootstrap"; 
import CalificacionEstrellas from "./calificacionEstrellas";
import CarouselPlatillos from "./CarouselPlatillos";


const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const { t } = useTranslation();
    const usuario_id = localStorage.getItem("Usuario Autenticado_id"); 
    const [favoritos, setFavoritos] = useState([]); 
    const [showMenu, setShowMenu] = useState(false)

    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurantes = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurantes) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurantes);
        }
    };

    const obtenerFavoritos = () => {
        const favoritesKey = `favoritos_${usuario_id}`;
        const favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        setFavoritos(favoritos);
    };

    useEffect(() => {
        obtenerDetallesRestaurante();
    }, [restaurante_id]);

    if (!restaurantDetail) {
        return <div>No se encontró el restaurante.</div>;
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const anadirFavoritos = async () => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            console.log(favoritos);
            if (!favoritos.includes(restaurante_id)) {
                const confirmacion = confirm("¿Deseas añadir este restaurante a tus favoritos?");
                if (confirmacion) {
                    const resultado = await favoritosRestaurants(usuario_id, restaurante_id);
                    if (resultado) {
                        favoritos.push({ favorito_id: resultado.favorito_id, restaurante_id })
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                    }
                }
            }
        } else {
            alert("Regístrate o inicia sesión si quieres añadir a favoritos.");
        }
    };

    const eliminarFavoritos = async (favorito_id) => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            
            const favorito = favoritos.find(fav => fav.restaurante_id === restaurante_id);
            if (favorito) {
                const confirmacion = confirm("¿Deseas eliminar este restaurante de tus favoritos?");
                if (confirmacion) {
                    const resultado = deleteRestau(String(favorito.favorito_id));                 
                    if (resultado) {
                        favoritos = favoritos.filter(fav => fav.favorito_id !== favorito.favorito_id);
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                    }
                }
            }
        }
    };

    const isFavorite = favoritos.some(fav => fav.restaurante_id === restaurante_id);

    return (
        <div>
            <div>
                <img className="img-normalizada" src="/src/img/lasbrisasheader.jpeg" alt="Logo" />
                <img className="logorestaurante" src="/src/img/images.jpg" alt="Logo del Restaurante" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    Hotel Las Brisas, ubicado en Puntarenas, es el lugar perfecto para disfrutar de mariscos frescos y una cocina costarricense en un ambiente acogedor junto al océano.
                </h4>
                {/* <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3> */}
                {/* <ModalMap/> */}
                <button className="añafavo-button" onClick={isFavorite ? () => eliminarFavoritos() : anadirFavoritos}>
                <FontAwesomeIcon
                 icon={isFavorite ? solidHeart : regularHeart} className={`heart-icon ${isFavorite ? "favorite" : ""}`}/>
                 </button>
                <img 
                    className="menu-image" 
                    src="/src/img/menu.png" 
                    alt="Ver Menú"
                    onClick={toggleMenu} 
                />
               <CalificacionEstrellas restauranteId={restaurantDetail.restaurante_id}/>
              <Modal show={showMenu} onHide={toggleMenu} fullscreen={true} className="custom-modal">
                    <Modal.Header closeButton className="custom-header" />
                    <Modal.Body className="custom-body">
                        <MenuRestaurantes />
                    </Modal.Body>
                </Modal>
            </div>
            <CarouselPlatillos/>
        </div>
    );
};

export default RestaurantsDetail;




