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
            dragging: true, // Habilitar arrastre
            scrollWheelZoom: true, // Permitir zoom con la rueda del mouse
            touchZoom: true, // Permitir zoom táctil
         
        });

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        //marcador para el Hotel Las Brisas con el icono de Google
        const HotelLasBrisasMarker = L.marker([9.974891256683694, -84.84748927705085], {
            icon: L.icon({
                iconUrl: googleMarkerIcon,
                iconSize: [25, 41],
            }),
        }).addTo(map);

        //Popup del marcador con un enlace
        HotelLasBrisasMarker.bindPopup(
            `<b>Hotel Las Brisas</b><br><a href="https://es.wikipedia.org/wiki/Torre_Eiffel" target="_blank">Más información</a>`
        ).openPopup();

        //limpiar el mapa al desmontar el componente
        return () => {
            map.remove();
            
        };
    }, []);

    return <div id="map" style={{ height: '450px', width: '100%' }} />;
};

export default Map;


