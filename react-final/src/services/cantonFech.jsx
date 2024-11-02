const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const canton2 = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/canton/', {
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
export default canton2;