// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const PlatillosGet = async (restaurante_id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/Platillos/?restaurante_id=${restaurante_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${Token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching image data:", error);
    }
};

export default PlatillosGet