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

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null)
    const { t } = useTranslation()
    const usuario_id = localStorage.getItem("Usuario Autenticado_id") 
    const [favoritos, setFavoritos] = useState([]); 
    const [showMenu, setShowMenu] = useState(false) // Controla la visibilidad del modal de menú

    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurantes = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurantes) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurantes);
        }
    }

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
                    const resultado = await favoritosRestaurants(usuario_id, restaurante_id)
                    if (resultado) {
                        favoritos.push({ favorito_id: resultado.favorito_id, restaurante_id })
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                        alert("Restaurante añadido a tus favoritos.");
                    } else {
                        alert("Hubo un error al añadir el restaurante a tus favoritos.");
                    }
                }
            }
        } else {
            alert("Regístrate o inicia sesión si quieres añadir a favoritos.");
        }
    }

    const eliminarFavoritos = async (favorito_id) => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            console.log(favoritos);
            const favorito = favoritos.find(fav => fav.restaurante_id === restaurante_id)
            console.log(favorito);
            if (favorito) {
                const confirmacion = confirm("¿Deseas eliminar este restaurante de tus favoritos?");
                if (confirmacion) {
                    const resultado = deleteRestau(String(favorito.favorito_id));                 
                    if (resultado) {
                        favoritos = favoritos.filter(fav => fav.favorito_id !== favorito.favorito_id);
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                        alert("Restaurante eliminado de tus favoritos.");
                    } else {
                        alert("Hubo un error al eliminar el restaurante de tus favoritos.");
                    }
                }
            } else {
                alert("Este restaurante no está en tus favoritos.");
            }
        } else {
            alert("Regístrate o inicia sesión si quieres eliminar de favoritos.");
        }
    }

    const isFavorite = favoritos.some(fav => fav.restaurante_id === restaurante_id);

    return (
        <div>
            <div>
                <img className="img-normalizada" src="https://visitachihuahuacapital.com/wp-content/uploads/2023/06/restaurantes-mariscos-chihuahua-9.jpg" alt="Logo" />
                <img className="logorestaurante" src="https://www.designevo.com/res/templates/thumb_small/lobster-in-circle-banner.webp" alt="Logo del Restaurante" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    Hotel Las Brisas, ubicado en Puntarenas, es el lugar perfecto para disfrutar de mariscos frescos y una cocina costarricense en un ambiente acogedor junto al océano.
                </h4>
                <h3>Precio Promedio: {restaurantDetail.precio_promedio}</h3>
                <h3>Calificación Promedio: {restaurantDetail.calificacion_promedio}</h3>
                <ModalMap/>
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
              <Modal show={showMenu} onHide={toggleMenu} fullscreen={true} className="custom-modal">
                    <Modal.Header closeButton className="custom-header" />
                    <Modal.Body className="custom-body">
                        <MenuRestaurantes />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default RestaurantsDetail;