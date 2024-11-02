// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"

const RestaGet = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
        });

        if (!response.ok) {
            throw new Error('Error al obtener restaurantes');
        }
        const restaurantes = await response.json();
        return restaurantes.filter(restaurante => restaurante.activo);
    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        throw error; 
    }
};

export default RestaGet;