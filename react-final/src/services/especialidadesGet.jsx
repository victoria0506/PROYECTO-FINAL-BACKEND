const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

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