const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token= "7059f86a1d940265ab5befed073aa4c03ecb0bd6"


const distritos2 = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/distrito/', {
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
export default distritos2;