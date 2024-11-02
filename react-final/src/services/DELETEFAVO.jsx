import Cookies from 'js-cookie';
import refreshToken from './TokenRefresh';
const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
//const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const deleteRestau = async (favorito_id) => {
    console.log("Eliminando favorito ID:", favorito_id);
    try {
        const accessToken = Cookies.get('access_token');
        console.log("Token de acceso:", accessToken);

        const response = await fetch(`http://localhost:8000/api/favoritos/${favorito_id}/`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            console.log("Favorito eliminado exitosamente");
            return true; // Retornar true si la eliminación fue exitosa
        } else if (response.status === 403 || response.status === 401) {
            console.log("Error de autorización, intentando refrescar token...");
            const refreshTokenValue = Cookies.get('refresh_token');
            if (refreshTokenValue) {
                const newAccessToken = await refreshToken(refreshTokenValue);
                // Guardar el nuevo token en las cookies
                Cookies.set('access_token', newAccessToken);
                // Intentar nuevamente eliminar el favorito
                return deleteRestau(favorito_id);
            } else {
                throw new Error('No hay token de refresco disponible.');
            }
        } else {
            console.error("Error en deleteRestau, código de respuesta:", response.status);
            throw new Error('Error al eliminar el favorito. Código de error: ' + response.status);
        }
    } catch (error) {
        console.error('Error en deleteRestau:', error);
        return false; // Retornar false si hubo un error
    }
};

export default deleteRestau;
