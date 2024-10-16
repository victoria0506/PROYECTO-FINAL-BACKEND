const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
// const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const distritos2 = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/distrito/', {
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
export default distritos2;