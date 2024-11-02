//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

const especiali = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/especilidades/', {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Token ${Token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error al cargar los distritos:", error);
        throw error; 
    }
};
export default especiali;