import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ latitud_map, longitud_map }) => {
    useEffect(() => {
        // Inicializar el mapa
        const map = L.map('map', {
            center: [latitud_map, longitud_map], // Usar las coordenadas proporcionadas
            zoom: 15, // Nivel de zoom
            dragging: true,
            scrollWheelZoom: true,
            touchZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Crear un marcador y agregarlo al mapa
        const marker = L.marker([latitud_map, longitud_map]).addTo(map);

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove(); // Eliminar el mapa
        };
    }, [latitud, longitud]); // Cambiar el mapa y el marcador cuando cambian las coordenadas

    return <div id="map" style={{ height: "500px" }} />; // Establecer altura para el mapa
};

export default Map;



