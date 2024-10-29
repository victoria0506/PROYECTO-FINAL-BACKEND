import { useState, useEffect } from "react"; 
import MenuRestaurantes from "./MenuRestaurantes"; 
import { useParams } from "react-router-dom";
import RestaGet from "../services/getRestaurant";
import fetchImagen from "../services/imageGet";
import favoritosRestaurants from "../services/FavoritosPost";
import deleteRestau from "../services/DELETEFAVO";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Modal } from "react-bootstrap"; 
import CalificacionEstrellas from "./calificacionEstrellas";
import CarouselPlatillos from "./CarouselPlatillos";
import Tabs from "../components/Tabs";
import '../style/paginarestaurantes.css';
import '../style/DetailRestau.css';
import { useTranslation } from "react-i18next";

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [restaurantImages, setRestaurantImages] = useState([]);  // Estado para almacenar las imágenes del restaurante
    const { t } = useTranslation();
    const usuario_id = localStorage.getItem("Usuario Autenticado_id"); 
    const [favoritos, setFavoritos] = useState([]); 
    const [isFavorite, setIsFavorite] = useState(false);
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

    const obtenerImagenesRestaurante = async () => {
        try {
            const imagenes = await fetchImagen(restaurante_id);
            setRestaurantImages(imagenes || []); // Verifica que imagenes contenga la url_header
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
        }
    };
    
    

    // Función para obtener los favoritos del usuario
    const obtenerFavoritos = () => {
        const favoritesKey = `favoritos_${usuario_id}`;
        const favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        setFavoritos(favoritos);
        const favoritoExistente = favoritos.some(fav => fav.restaurante_id === restaurante_id);
        setIsFavorite(favoritoExistente);
    };

    useEffect(() => {
        const fetchData = async () => {
            await obtenerDetallesRestaurante();
            await obtenerImagenesRestaurante();
            obtenerFavoritos();
        };
        fetchData();
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
            const favoritoExistente = favoritos.find(fav => fav.restaurante_id === restaurante_id);
    
            if (!favoritoExistente) {
                const confirmacion = confirm("¿Deseas añadir este restaurante a tus favoritos?");
                if (confirmacion) {
                    setIsFavorite(true);                    
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
                    setIsFavorite(false);                    
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
    console.log("IMAGENES: ", restaurantImages);
    
    return (
        <div>
            <div>
                {/* Usa la primera imagen para el header y logo */}
                {restaurantImages.length > 0 &&  (
                    <>
                        <img className="img-normalizada" src={restaurantImages[0].url_header} alt="header" />
                        <img className="logorestaurante" src={restaurantImages[0].url_img} alt="Logo del Restaurante" />
                    </>
                )}
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    Restaurante & Sport Bar dentro del Hotel Cayuga con deliciosa variedad de comida y cócteles.
                </h4>
                <button className="añafavo-button" onClick={isFavorite ? eliminarFavoritos : anadirFavoritos}>
                    <FontAwesomeIcon
                        icon={isFavorite ? solidHeart : regularHeart}
                        className={`heart-icon ${isFavorite ? "favorite" : ""}`}
                    />
                </button>
                <CalificacionEstrellas restauranteId={restaurantDetail.restaurante_id}/>
                <Tabs restauranteId={restaurantDetail.restaurante_id}/>

                {/* Carrusel de imágenes adicionales del restaurante */}
                {/* {restaurantImages.length > 1 && (
                    <div className="carousel-container">
                        <h3>Galería de Imágenes</h3>
                        <div className="image-carousel">
                            {restaurantImages.slice(1).map((imagen) => (
                                <img
                                    key={imagen.id}
                                    src={imagen.url_img}
                                    alt={`Imagen del restaurante`}
                                    className="carousel-image"
                                    style={{ width: "200px", height: "auto", margin: "10px" }}
                                />
                            ))}
                        </div>
                    </div>
                )} */}

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





