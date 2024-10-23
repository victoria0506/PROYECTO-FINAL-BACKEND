import { useState, useEffect } from "react"; 
import MenuRestaurantes from "./MenuRestaurantes"; 
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
import Tabs from "../components/Tabs";

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const { t } = useTranslation();
    const usuario_id = localStorage.getItem("Usuario Autenticado_id"); 
    const [favoritos, setFavoritos] = useState([]); 
    const [isFavorite, setIsFavorite] = useState(false); // Nuevo estado para manejar si es favorito
    const [showMenu, setShowMenu] = useState(false);

    // Función para obtener los detalles del restaurante
    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurantes = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurantes) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurantes);
        }
    };

    // Función para obtener los favoritos del usuario
    const obtenerFavoritos = () => {
        const favoritesKey = `favoritos_${usuario_id}`;
        const favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        setFavoritos(favoritos);
        // Verificar si el restaurante actual está en favoritos
        const favoritoExistente = favoritos.some(fav => fav.restaurante_id === restaurante_id);
        setIsFavorite(favoritoExistente); // Actualizamos el estado `isFavorite`
    };

    useEffect(() => {
        obtenerDetallesRestaurante();
        obtenerFavoritos(); // Llamamos a obtenerFavoritos al cargar el componente
    }, [restaurante_id]);

    // Si no se encuentra el detalle del restaurante
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
            const favoritoExistente = favoritos.find(fav => fav.restaurante_id === restaurante_id);
    
            if (!favoritoExistente) {
                const confirmacion = confirm("¿Deseas añadir este restaurante a tus favoritos?");
                if (confirmacion) {
                    setIsFavorite(true); // Actualizar inmediatamente el estado visual del ícono
                    
                    const resultado = await favoritosRestaurants(usuario_id, restaurante_id);
                    if (resultado) {
                        favoritos.push({ favorito_id: resultado.favorito_id, restaurante_id });
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                    }
                }
            }
        } else {
            alert("Regístrate o inicia sesión si quieres añadir a favoritos.");
        }
    };
    
    const eliminarFavoritos = async () => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            const favorito = favoritos.find(fav => fav.restaurante_id === restaurante_id);
    
            if (favorito) {
                const confirmacion = confirm("¿Deseas eliminar este restaurante de tus favoritos?");
                if (confirmacion) {
                    setIsFavorite(false); // Actualizar inmediatamente el estado visual del ícono
    
                    const resultado = await deleteRestau(String(favorito.favorito_id));
                    if (resultado) {
                        favoritos = favoritos.filter(fav => fav.favorito_id !== favorito.favorito_id);
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                    }
                }
            }
        }
    };
    
    return (
        <div>
            <div>
                <img className="img-normalizada" src="/src/img/headercayuga.jpeg" alt="Logo" />
                <img className="logorestaurante" src="/src/img/logocayuga.jpg" alt="Logo del Restaurante" />
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    Restaurante & Sport Bar dentro del Hotel Cayuga con deliciosa variedad de comida y cócteles.
                </h4>
                <button className="añafavo-button" onClick={isFavorite ? () => eliminarFavoritos() : anadirFavoritos}>
    <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        className={`heart-icon ${isFavorite ? "favorite" : ""}`}
    />
</button>


                <CalificacionEstrellas restauranteId={restaurantDetail.restaurante_id}/>
                
                <Tabs/>
                <Modal show={showMenu} onHide={toggleMenu} fullscreen={true} className="custom-modal">
                    <Modal.Header closeButton className="custom-header" />
                    <Modal.Body className="custom-body">
                        <MenuRestaurantes />
                    </Modal.Body>
                </Modal>
            </div>
            <div>
                <CarouselPlatillos/>
            </div>
        </div>
    );
};

export default RestaurantsDetail;





