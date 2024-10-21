// const refreshToken = "tu_token_de_refresco";

const refreshTokenRequest = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Token refrescado:', data);
        } else {
            console.error('Error al refrescar el token:', data);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
 refreshTokenRequest();
