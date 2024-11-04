import Cookies from 'js-cookie';
import refreshToken from './TokenRefresh';
const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a";


const favoritosGET = async (usuario_id) => { 
    console.log(usuario_id);
    try {
        const accessToken = Cookies.get('access_token');
        const response = await fetch(`http://localhost:8000/api/favoritos/${usuario_id}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (response.status === 403 || response.status === 401) {
            const refreshTokenValue = Cookies.get('refresh_token');
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue);
                return favoritosGET(newAccessToken);
            } else {
                throw new Error('No hay token de refresco disponible.');
            }
        }
        if (response.status === 404) {
            return []; // No se encontraron favoritos
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('Error en favoritosGET:', error);
        throw error;
    }
};

export default favoritosGET;
