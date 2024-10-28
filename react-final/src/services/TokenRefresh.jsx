import Cookies from 'js-cookie'

const refreshToken = async (refreshToken) => {
    try {
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json()
        if (response.ok) {
            Cookies.set('access_token', data.access, { expires: 1, secure: true, sameSite: 'Strict' })
            console.log('Token refrescado:', data.access);
            return data.access
        } else {
            console.error('Error al refrescar el token:', data)
            throw new Error(data.detail || 'Error al refrescar el token')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        throw error
    }
}
export default refreshToken
