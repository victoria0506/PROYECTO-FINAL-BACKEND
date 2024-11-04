// Importamos los hooks de React para manejar el estado y efectos en nuestro componente
import { useState, useEffect } from "react";
// Importamos la función que obtendrá los restaurantes desde un servicio
import RestaGet from "../services/getRestaurant";
// Importamos componentes de Bootstrap para crear el modal y botones
import { Modal, Button } from "react-bootstrap";
// Importamos el archivo de estilos CSS para la búsqueda
import "../style/Busqueda.css";
// Importamos el hook para la traducción de textos
import { useTranslation } from "react-i18next";
// Importamos el componente Link para navegar entre diferentes rutas de nuestra aplicación
import { Link } from "react-router-dom";

// Definimos nuestro componente BusquedaRes
const BusquedaRes = () => {
    // Creamos un estado para manejar la búsqueda actual del usuario
    const [busqueda, setBusqueda] = useState('');
    // Creamos un estado para controlar si el modal se muestra o no
    const [showModal, setShowModal] = useState(false);
    // Creamos un estado para almacenar los restaurantes encontrados
    const [restaurantEncontrados, setRestaurantEncontrados] = useState([]);
    // Creamos un estado para almacenar todos los restaurantes que obtenemos del servicio
    const [restaurantes, setRestaurantes] = useState([]);
    // Inicializamos el traductor para usar textos en varios idiomas
    const { t } = useTranslation();
    // Creamos un estado para manejar mensajes de error o información
    const [mensaje, setMensaje] = useState("");

    // Este efecto se ejecuta al cargar el componente por primera vez
    useEffect(() => {
        // Definimos una función asincrónica para obtener los restaurantes
        const fetchRestaurants = async () => {
            // Llamamos al servicio para obtener los datos de los restaurantes
            const dataResta = await RestaGet();
            // Si obtenemos datos, los almacenamos en el estado de restaurantes
            if (dataResta) {
                setRestaurantes(dataResta);
            }
        };
        // Llamamos a la función para que se ejecute
        fetchRestaurants();
    }, []); // El arreglo vacío indica que solo se ejecutará al montar el componente

    // Función que maneja la búsqueda de restaurantes
    const handleSearch = (e) => {
        // Obtenemos el valor del input de búsqueda
        const value = e.target.value;
        // Actualizamos el estado de búsqueda con el nuevo valor
        setBusqueda(value);

        // Si hay un valor en el input, filtramos los restaurantes
        if (value) {
            // Filtramos los restaurantes según el nombre, precio, calificación o capacidad
            const filtrosRestaurantes = restaurantes.filter(restaurante => {
                const nombre = restaurante.nombre_restaurante.toLowerCase().includes(value.toLowerCase());
                const precio = restaurante.precio_promedio.toString().includes(value);
                const calificación = restaurante.calificacion_promedio.toString().includes(value);
                const capacidad = restaurante.capacidad.toString().includes(value);

                // Retornamos verdadero si alguno de los filtros coincide
                return nombre || precio || calificación || capacidad;
            });

            // Actualizamos el estado con los restaurantes encontrados
            setRestaurantEncontrados(filtrosRestaurantes);
            // Si no se encontraron restaurantes, mostramos un mensaje
            setMensaje(filtrosRestaurantes.length > 0 ? "" : `No se encontraron resultados para: ${value}`);
        } else {
            // Si no hay valor en la búsqueda, reiniciamos los resultados y el mensaje
            setRestaurantEncontrados([]);
            setMensaje("");
        }
    };

    // Función para abrir el modal de búsqueda
    const AbrirModal = () => {
        // Mostramos el modal
        setShowModal(true);
        // Reiniciamos los valores de búsqueda y resultados
        setBusqueda('');
        setMensaje('');
        setRestaurantEncontrados([]);
    };

    // El componente retorna el JSX que se va a renderizar
    return (
        <div>
            {/* Imagen que al hacer clic abre el modal de búsqueda */}
            <img src="/src/img/barrabusqueda.png" onClick={AbrirModal} className="search-img" />
            {/* Modal que se muestra cuando se abre el componente de búsqueda */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('search')}</Modal.Title> {/* Título del modal que se traduce */}
                </Modal.Header>
                <Modal.Body>
                    {/* Input de búsqueda donde el usuario puede escribir su consulta */}
                    <input
                        className="search-bar"
                        type="search"
                        placeholder={t('search')} // Placeholder también traducido
                        value={busqueda}
                        onChange={handleSearch} // Llama a la función de búsqueda cuando hay un cambio
                    />
                    {/* Si hay restaurantes encontrados, los mostramos */}
                    {restaurantEncontrados.length > 0 && (
                        <div>
                            {restaurantEncontrados.map(restaurante => (
                                <div key={restaurante.restaurante_id}>
                                    {/* Enlazamos a la página del restaurante específico */}
                                    <Link to={`/Restaurant/${restaurante.restaurante_id}`}>
                                        <h5>{restaurante.nombre_restaurante}</h5> {/* Nombre del restaurante */}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Mostramos el mensaje de error o información */}
                    <p className="mjs">{mensaje}</p>
                </Modal.Body>
                <Modal.Footer>
                    {/* Botón para cerrar el modal */}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default BusquedaRes;

