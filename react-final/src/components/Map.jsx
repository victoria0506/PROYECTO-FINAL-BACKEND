import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// URL del icono de Google Maps
const googleMarkerIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const Map = () => {
    useEffect(() => {
        const map = L.map('map', {
            center: [9.974891256683694, -84.84748927705085], // Coordenadas de Hotel Las Brisas
            zoom: 30, // Nivel de zoom
            dragging: true,
            scrollWheelZoom: true,
            touchZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Marcador para el Hotel Las Brisas
        const HotelLasBrisasMarker = L.marker([9.974891256683694, -84.84748927705085], {
            icon: L.icon({
                iconUrl: googleMarkerIcon,
                iconSize: [25, 41],
            }),
        }).addTo(map);

        HotelLasBrisasMarker.bindPopup(
            `<b>Hotel Las Brisas</b><br><a href="http://localhost:5173/Restaurant/1" target="_blank">Más información</a>`
        ).openPopup();

        return () => {
            map.remove(); // Limpiar el mapa al desmontar el componente
        };
    }, []);

    return <div id="map" />;
};

export default Map;
