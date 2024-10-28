import Cookies from 'js-cookie'; 
import refreshToken from './TokenRefresh';

const CalifiGET = async () => {
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch('http://localhost:8000/api/califiRestaur/', {
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
                return CalifiGET(newAccessToken)
            } else {
                throw new Error('No hay token de refresco disponible.')
            }
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error en CalifiGET:', error)
        throw error
    }
}
export default CalifiGET