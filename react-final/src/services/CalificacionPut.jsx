import Cookies from 'js-cookie'
import refreshToken from './TokenRefresh'

const CaliPut = async (calificacion_id, usuario_id, restaurante_id, calificacion) => {
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch(`http://localhost:8000/api/califiRestaur/${calificacion_id}/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                restaurante_id: restaurante_id,
                calificacion: calificacion,
            }),
        })
        if (response.status === 403 || response.status === 401) {
            const refreshTokenValue = Cookies.get('refresh_token')
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue)
                return CaliPut(calificacion_id, usuario_id, restaurante_id, calificacion, newAccessToken)
            } else {
                throw new Error('No hay token de refresco disponible.')
            }
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error en CaliPut:', error)
        alert("Error del servidor, por favor intente después")
        throw error
    }
}
export default CaliPut