import { useState, useEffect } from "react";
import RestaGet from "../services/getRestaurant";
import { Modal, Button } from "react-bootstrap";
import "../style/Busqueda.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BusquedaRes = () => {
    const [busqueda, setBusqueda] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [restaurantEncontrado, setRestaurantEncontrado] = useState(null)
    const [restaurantes, setRestaurantes] = useState([])
    const { t } = useTranslation();
    const [mensaje, setMensaje] = useState("")

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
            const filtrosRestaurantes = restaurantes.filter(restaurante => {
                const nombre = restaurante.nombre_restaurante.toLowerCase().includes(busqueda.toLowerCase() || restaurante.precio_promedio.includes(busqueda))
                const precio = restaurante.precio_promedio.toString().includes(busqueda)
                const Calificación = restaurante.calificacion_promedio.toString().includes(busqueda)
                const capacidad = restaurante.capacidad.toString().includes(busqueda)

                return nombre || precio || Calificación || capacidad
            })
            if (filtrosRestaurantes.length > 0) {
                setRestaurantEncontrado(filtrosRestaurantes[0])
                setMensaje("") 
            } else {
                setMensaje(`No se encontraron resultados para: ${busqueda}`)
                setRestaurantEncontrado(null)
            }
        }
    }
    const AbrirModal = ()=> {
        setShowModal(true)
        setBusqueda('')
        setMensaje('')
        setRestaurantEncontrado(null)
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
                            <Link to={`/Restaurant/${restaurantEncontrado.restaurante_id}`}>
                               <h5>{restaurantEncontrado.nombre_restaurante}</h5>
                            </Link>
                            <p>Precio Promedio: {restaurantEncontrado.precio_promedio}</p>
                            <p>Capacidad: {restaurantEncontrado.capacidad}</p>
                            <p>Calificación Promedio: {restaurantEncontrado.calificacion_promedio}</p>
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
}

export default BusquedaRes;