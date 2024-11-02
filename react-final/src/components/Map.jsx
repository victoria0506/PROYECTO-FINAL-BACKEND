import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ restaurantCoordinates }) => {
    useEffect(() => {
        // Asegúrate de que las coordenadas son válidas antes de inicializar el mapa
        if (!restaurantCoordinates || restaurantCoordinates.includes(null)) {
            return; // No hacer nada si las coordenadas son inválidas
        }
        console.log(restaurantCoordinates);
        
        // Inicializa el mapa solo una vez
        const map = L.map('map', {
            center: restaurantCoordinates, // Coordenadas iniciales
            zoom: 15, // Ajusta el nivel de zoom según sea necesario
            dragging: true,
            scrollWheelZoom: true,
            touchZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Añadir el marcador en las coordenadas del restaurante
        L.marker(restaurantCoordinates)
            .addTo(map)
            .bindPopup('Restaurante aquí') // Mensaje que aparece al hacer clic en el marcador
            .openPopup();

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove(); // Eliminar el mapa
        };
    }, [restaurantCoordinates]); // Re-renderizar cuando cambian las coordenadas

    return <div id="map" style={{ height: "500px" }} />; // Establecer altura para el mapa
};

export default Map;


