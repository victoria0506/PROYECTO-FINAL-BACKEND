import { useEffect, useState } from 'react';
import L from 'leaflet';

const Map = ({ restauranteId }) => {
  const [coords, setCoords] = useState({ lat: undefined, lng: undefined });
  const [restauranteInfo, setRestauranteInfo] = useState({ nombre: '', id: '' });
  const [error, setError] = useState(null);
  const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";

  // Función para obtener las coordenadas y datos del restaurante desde el API
  const fetchCoords = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admiRestaur/${restauranteId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${Token}`
        }
      });

      if (response.status === 401) {
        throw new Error('Unauthorized access - please log in.');
      }

      const restaurante = await response.json();
      console.log(restaurante); // Log para verificar la estructura de los datos

      if (restaurante.latitud_map && restaurante.longitud_map) {
        setCoords({ lat: restaurante.latitud_map, lng: restaurante.longitud_map });
        setRestauranteInfo({
          nombre: restaurante.nombre_restaurante,
          id: restaurante.restaurante_id,
        });
      } else {
        throw new Error('Coordinates not found.');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching coordinates:', err);
    }
  };

  useEffect(() => {
    if (restauranteId) {
      fetchCoords();
    }
  }, [restauranteId]);

  useEffect(() => {
    if (coords.lat && coords.lng) {
      const mapContainer = document.getElementById('map');
      
      if (!mapContainer._leaflet_id) {
        const map = L.map('map').setView([coords.lat, coords.lng], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // URL dinámica de la página del restaurante
        const restauranteURL = `http://localhost:5173/Restaurant/${restauranteInfo.id}`;

        // Popup con el nombre del restaurante y un link a su página
        L.marker([coords.lat, coords.lng]).addTo(map)
          .bindPopup(
            `<strong>${restauranteInfo.nombre}</strong><br>
             <a href="${restauranteURL}" target="_blank">Más información sobre ${restauranteInfo.nombre}</a>`
          )
          .openPopup();
      }
    }
  }, [coords, restauranteInfo]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div id="map" style={{ height: '520px', width: '100%' }}></div>
    </div>
  );
};

export default Map;



