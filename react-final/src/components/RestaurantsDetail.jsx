import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import RestaGet from "../services/getRestaurant";
import fetchImagen from "../services/imageGet";
import favoritosRestaurants from "../services/FavoritosPost";
import deleteRestau from "../services/DELETEFAVO";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import CalificacionEstrellas from "./CalificacionEstrellas";
import CarouselPlatillos from "./CarouselPlatillos";
import Tabs from "../components/Tabs";
import toastr from 'toastr'; 
import Swal from 'sweetalert2'; // Importa SweetAlert
import 'toastr/build/toastr.min.css'; 
import '../style/paginarestaurantes.css';
import '../style/DetailRestau.css';
import { useTranslation } from "react-i18next";

const RestaurantsDetail = () => {
    const { restaurante_id } = useParams(); // Obtiene el ID del restaurante de la URL
    const [restaurantDetail, setRestaurantDetail] = useState(null); // Detalles del restaurante
    const [restaurantImages, setRestaurantImages] = useState([]);  // Imágenes del restaurante
    const { t } = useTranslation(); // Hook para traducción
    const usuario_id = localStorage.getItem("Usuario Autenticado_id"); // ID del usuario autenticado
    const [favoritos, setFavoritos] = useState([]); // Lista de favoritos del usuario
    const [isFavorite, setIsFavorite] = useState(false); // Estado que indica si el restaurante es favorito
    const [showMenu, setShowMenu] = useState(false); // Estado para controlar la visualización del menú

    const obtenerDetallesRestaurante = async () => {
        const restaurantes = await RestaGet();
        const Restaurante = restaurantes.find(resta => String(resta.restaurante_id) === restaurante_id);
        if (!Restaurante) {
            throw new Error("Restaurante no encontrado");
        } else {
            setRestaurantDetail(Restaurante);
        }
    };

    // Función para obtener las imágenes del restaurante
    const obtenerImagenesRestaurante = async () => {
        try {
            const imagenes = await fetchImagen(restaurante_id);
            setRestaurantImages(imagenes || []); 
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
        }
    };

    const obtenerFavoritos = () => {
        const favoritesKey = `favoritos_${usuario_id}`;
        const favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        setFavoritos(favoritos);
        const favoritoExistente = favoritos.some(fav => fav.restaurante_id === restaurante_id);
        setIsFavorite(favoritoExistente);
    };

    // Efecto para cargar los datos del restaurante y favoritos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            await obtenerDetallesRestaurante();
            await obtenerImagenesRestaurante();
            obtenerFavoritos();
        };
        fetchData();
    }, [restaurante_id]);

    // Si no se encontró el restaurante, muestra un mensaje
    if (!restaurantDetail) {
        return <div>No se encontró el restaurante.</div>;
    }

    // Función para alternar la visualización del menú
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Función para añadir el restaurante a favoritos
    const anadirFavoritos = async () => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            const favoritoExistente = favoritos.find(fav => fav.restaurante_id === restaurante_id);
            if (!favoritoExistente) {
                const confirmacion = await Swal.fire({
                    title: t("loginToAddFavorites"),
                    text: t("Do you want to add this restaurant to your favorites?"),
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: t("Yes"),
                    cancelButtonText: t("No"),
                });

                if (confirmacion.isConfirmed) {
                    setIsFavorite(true);
                    const resultado = await favoritosRestaurants(usuario_id, restaurante_id);
                    if (resultado) {
                        favoritos.push({ favorito_id: resultado.favorito_id, restaurante_id });
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos); 
                        toastr.success("Restaurante añadido a favoritos.");
                    }
                }
            }
        } else {
            toastr.warning(t("loginToAddFavorites"));
        }
    };
    
    // Función para eliminar el restaurante de favoritos
    const eliminarFavoritos = async () => {
        if (usuario_id) {
            const favoritesKey = `favoritos_${usuario_id}`;
            let favoritos = JSON.parse(localStorage.getItem(favoritesKey)) || [];
            const favorito = favoritos.find(fav => fav.restaurante_id === restaurante_id);
            if (favorito) {
                const confirmacion = await Swal.fire({
                    title: t("Are you sure?"),
                    text: "¿Deseas eliminar este restaurante de tus favoritos?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: t("Yes"),
                    cancelButtonText: t("No"),
                });

                if (confirmacion.isConfirmed) {
                    setIsFavorite(false);
                    const resultado = await deleteRestau(String(favorito.favorito_id));
                    if (resultado) {
                        favoritos = favoritos.filter(fav => fav.favorito_id !== favorito.favorito_id);
                        localStorage.setItem(favoritesKey, JSON.stringify(favoritos));
                        setFavoritos(favoritos);
                        toastr.success("Restaurante eliminado de favoritos.");
                    } else {
                        toastr.error("No se pudo eliminar el restaurante de favoritos.");
                    }
                }
            }
        } else {
            toastr.warning(t("loginToAddFavorites"));
        }
    };

    return (
        <div>
            <div>
                {restaurantImages.length > 0 &&  (
                    <>
                        <img className="img-normalizada" src={restaurantImages[0].url_header} alt="header" />
                        <img className="logorestaurante" src={restaurantImages[0].url_img} alt="Logo del Restaurante" />
                    </>
                )}
                <h3 className="nombrerestaurante">{restaurantDetail.nombre_restaurante}</h3>
                <h4 className="introrestaurantes">
                    {restaurantDetail.descripcion}
                </h4>
                <button className="añafavo-button" onClick={isFavorite ? eliminarFavoritos : anadirFavoritos}>
                    <FontAwesomeIcon
                        icon={isFavorite ? solidHeart : regularHeart}
                        className={`heart-icon ${isFavorite ? "favorite" : ""}`}
                    />
                </button>
                <CalificacionEstrellas restauranteId={restaurante_id}/>
                <Tabs restauranteId={restaurantDetail.restaurante_id}/>
            </div>
            <div>
                <CarouselPlatillos restaurante_id={restaurante_id} />
            </div>
        </div>
    );
};

export default RestaurantsDetail; 




