import Cookies from 'js-cookie';
import refreshToken from './TokenRefresh';
const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"



const favoritosRestaurants = async (usuario_id, restaurante_id) => {
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch('http://localhost:8000/api/favoritos/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                restaurante_id: restaurante_id,
            }),
        })
        if (response.status === 403 || response.status === 401) {
            const refreshTokenValue = Cookies.get('refresh_token')
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue)
                return favoritosRestaurants(usuario_id, restaurante_id, newAccessToken)
            } else {
                throw new Error('No hay token de refresco disponible.')
            }
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error en favoritosRestaurants:', error)
    }
}
export default favoritosRestaurants