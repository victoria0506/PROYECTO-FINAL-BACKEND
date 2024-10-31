const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"


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
        return restaurantes;
    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        throw error; 
    }
};

export default RestaGet;