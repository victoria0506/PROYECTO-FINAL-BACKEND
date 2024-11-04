import { useState, useEffect } from "react";
import RestaGet from "../services/getRestaurant";
import { Modal, Button } from "react-bootstrap";
import "../style/Busqueda.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BusquedaRes = () => {
    const [busqueda, setBusqueda] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [restaurantEncontrados, setRestaurantEncontrados] = useState([]);
    const [restaurantes, setRestaurantes] = useState([]);
    const { t } = useTranslation();
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchRestaurants = async () => {
            const dataResta = await RestaGet();
            if (dataResta) {
                setRestaurantes(dataResta);
            }
        };
        fetchRestaurants();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setBusqueda(value);

        if (value) {
            const filtrosRestaurantes = restaurantes.filter(restaurante => {
                const nombre = restaurante.nombre_restaurante.toLowerCase().includes(value.toLowerCase());
                const precio = restaurante.precio_promedio.toString().includes(value);
                const calificación = restaurante.calificacion_promedio.toString().includes(value);
                const capacidad = restaurante.capacidad.toString().includes(value);

                return nombre || precio || calificación || capacidad;
            });

            setRestaurantEncontrados(filtrosRestaurantes);
            setMensaje(filtrosRestaurantes.length > 0 ? "" : `No se encontraron resultados para: ${value}`);
        } else {
            setRestaurantEncontrados([]);
            setMensaje("");
        }
    };

    const AbrirModal = () => {
        setShowModal(true);
        setBusqueda('');
        setMensaje('');
        setRestaurantEncontrados([]);
    };

    return (
        <div>
            <img src="/src/img/barrabusqueda.png" onClick={AbrirModal} className="search-img" />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('search')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className="search-bar"
                        type="search"
                        placeholder={t('search')}
                        value={busqueda}
                        onChange={handleSearch}
                    />
                    {restaurantEncontrados.length > 0 && (
                        <div>
                            {restaurantEncontrados.map(restaurante => (
                                <div key={restaurante.restaurante_id}>
                                    <Link to={`/Restaurant/${restaurante.restaurante_id}`}>
                                        <h5>{restaurante.nombre_restaurante}</h5>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="mjs">{mensaje}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BusquedaRes;
