import Cookies from 'js-cookie';
import refreshToken from './TokenRefresh';
const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const favoritosGET = async () => { 
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch('http://localhost:8000/api/favoritos/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        if (response.status === 403 || response.status === 401) {
            const refreshTokenValue = Cookies.get('refresh_token')
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue)
                return favoritosGET(newAccessToken)
            } else {
                throw new Error('No hay token de refresco disponible.')
            }
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error en favoritosGET:', error)
    }
}

export default favoritosGET