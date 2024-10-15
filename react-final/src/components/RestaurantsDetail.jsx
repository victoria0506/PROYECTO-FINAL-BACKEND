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
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modal } from "react-bootstrap"; 

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null)
    const { t } = useTranslation()
    const usuario_id = localStorage.getItem("Usuario Autenticado_id") 
    const [favoritos, setFavoritos] = useState([]); 
    const [showMenu, setShowMenu] = useState(false) // Controla la visibilidad del modal de menú

    // Función para obtener detalles del restaurante
    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurante = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurante) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurante);
        }
    }

    const obtenerFavoritos = () => {
        const favoritesKey = `favoritos_${usuario_id}`;
        const favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        setFavoritos(favoritos);
    };

    useEffect(() => {
        obtenerDetallesRestaurante();
        obtenerFavoritos();
    }, [restaurante_id]);

    if (!restaurantDetail) {
        return <div>No se encontró el restaurante.</div>;
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Función para añadir a favoritos
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
            } else {
                alert("Este restaurante ya está en tus favoritos.");
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
                <div>
                    {favoritos.map(fav => (
                        fav.restaurante_id === restaurante_id ? (
                            <button key={fav.favorito_id} className="AñaFavo" onClick={() => eliminarFavoritos(fav.favorito_id)}>
                                {t('Remove from favorites')}
                            </button>
                        ) : null
                    ))}
                    {!favoritos.some(fav => fav.restaurante_id === restaurante_id) && (
                        <button className="AñaFavo" onClick={anadirFavoritos}>
                            {t('Add to favorites')}
                        </button>
                    )}
                </div>
                <img 
                    className="menu-image" 
                    src="/src/img/menu.png"
                    alt="Ver Menú"
                    onClick={toggleMenu}
                />
                {showMenu && <MenuRestaurantes />}
                <ModalMap />
                <Modal show={showMenu} onHide={toggleMenu} fullscreen={true} className="custom-modal">
                    <Modal.Header closeButton className="custom-header">
                    </Modal.Header>
                    <Modal.Body className="custom-body">
                        <MenuRestaurantes />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default RestaurantsDetail;