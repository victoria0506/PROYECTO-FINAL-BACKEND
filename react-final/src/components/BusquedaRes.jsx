import { useState, useEffect } from "react";
import RestaGet from "../services/getRestaurant";
import { Modal, Button } from "react-bootstrap";
import "../style/Busqueda.css";
import { useTranslation } from "react-i18next";

const BusquedaRes = () => {
    const [busqueda, setBusqueda] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [restaurantEncontrado, setRestaurantEncontrado] = useState(null)
    const [restaurantes, setRestaurantes] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        const Restaur = async () => {
            const dataResta = await RestaGet()
            if(dataResta){
                setRestaurantes(dataResta)
            }
        }
        Restaur()
    },[])
    
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const filtrosRestaurantes = restaurantes.filter(restaurante =>
                restaurante.nombre_restaurante.toLowerCase().includes(busqueda.toLowerCase())
            )
            if (filtrosRestaurantes.length > 0) {
                setRestaurantEncontrado(filtrosRestaurantes[0]);  
            } else {
                alert(`No se encontraron resultados para: ${busqueda}`)
            }
        }
    }
    const AbrirModal = ()=> {
        setShowModal(true)
    }

    return (
        <div>
            <img src="src/img/barrabusqueda.png" onClick={AbrirModal} className="search-img"
               
        />
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
                        onChange={(e) => setBusqueda(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    {restaurantEncontrado && (
                        <div>
                            <h5>{restaurantEncontrado.nombre_restaurante}</h5>
                            <p>Precio Promedio: {restaurantEncontrado.precio_promedio}</p>
                            <p>Capacidad: {restaurantEncontrado.capacidad}</p>
                            <p>Calificación Promedio: {restaurantEncontrado.calificacion_promedio}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BusquedaRes;
