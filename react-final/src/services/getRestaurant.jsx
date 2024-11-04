//const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
const Token= "7059f86a1d940265ab5befed073aa4c03ecb0bd6"

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