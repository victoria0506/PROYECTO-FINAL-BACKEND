const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"

const canton2 = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/canton/', {
            method: 'GET', 
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