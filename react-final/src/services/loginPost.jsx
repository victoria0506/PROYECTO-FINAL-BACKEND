//const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
const Token= "7059f86a1d940265ab5befed073aa4c03ecb0bd6"
import Cookies from 'js-cookie'


const LoginFech = async (email, contrasena) => {
    try {
        const response = await fetch('http://localhost:8000/api/usersLogin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}` 
            },
            body: JSON.stringify({ email, contrasena })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la autenticación')
        }
        const data = await response.json();
        console.log("Token recibido:", data.access_token); 
        Cookies.set('access_token', data.access_token, { expires: 1, secure: true, sameSite: 'Strict' })
        if (data.refresh_token) {
            Cookies.set('refresh_token', data.refresh_token, { expires: 7, secure: true, sameSite: 'Strict' })
        }
        console.log('Tokens guardados en cookies.')
        return data
    } catch (error) {
        console.error("Error durante el login:", error)
        throw error
    }
};

export default LoginFech