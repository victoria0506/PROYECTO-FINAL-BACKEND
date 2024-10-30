import Cookies from 'js-cookie';
import refreshToken from './TokenRefresh';
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const deleteRestau = async (restaurante_id) => { 
    console.log(restaurante_id)
    console.log("Tipo de restaurante_id:", typeof restaurante_id)
    try {
        const accessToken = Cookies.get('access_token')
        const response = await fetch(`http://localhost:8000/api/favoritos/${restaurante_id}/`, {
            method: 'DELETE',
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
                return deleteRestau(restaurante_id)
            } else {
                throw new Error('No hay token de refresco disponible.');
            }
        }
    } catch (error) {
        console.error('Error en deleteRestau:', error);
    } 
}

export default deleteRestau
