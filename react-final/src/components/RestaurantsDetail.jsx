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
    const { restaurante_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [restaurantImages, setRestaurantImages] = useState([]);  
    const { t } = useTranslation();
    const usuario_id = localStorage.getItem("Usuario Autenticado_id"); 
    const [favoritos, setFavoritos] = useState([]); 
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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
                <CarouselPlatillos restaurante_id={restaurante_id}/>
            </div>
        </div>
    );
};

export default RestaurantsDetail; 



