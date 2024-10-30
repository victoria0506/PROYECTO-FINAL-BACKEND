const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

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