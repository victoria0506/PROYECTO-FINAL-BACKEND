import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    useEffect(() => {
        // Inicializar el mapa solo una vez
        const map = L.map('map', {
            center: [9.981390403755313, -84.75704731772372], // Coordenadas iniciales
            zoom: 30, // Nivel de zoom
            dragging: true,
            scrollWheelZoom: true,
            touchZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove(); // Eliminar el mapa
        };
    }, []); // Añadir el array vacío para que se ejecute solo una vez al montar

    return <div id="map" style={{ height: "500px" }} />; // Establecer altura para el mapa
};

export default Map;


