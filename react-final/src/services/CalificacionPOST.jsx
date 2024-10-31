import Cookies from 'js-cookie'
import refreshToken from './TokenRefresh'

const calificacionPOST = async (restaurante_id, usuario_id, rate) => {
    console.log(restaurante_id);
    console.log(usuario_id);
    console.log(rate);
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch('http://localhost:8000/api/califiRestaur/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
            body: JSON.stringify({
                restaurante_id: restaurante_id,
                usuario_id: usuario_id,
                calificacion: rate,
            }),
        })
        if (response.status === 403 || response.status === 401) {
            const refreshTokenValue = Cookies.get('refresh_token')
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue)
                return calificacionPOST(restaurante_id, usuario_id, calificacion, newAccessToken)
            } else {
                throw new Error('No hay token de refresco disponible.')
            }
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error en calificacionPOST:', error)
        throw error
    }
}

export default calificacionPOST