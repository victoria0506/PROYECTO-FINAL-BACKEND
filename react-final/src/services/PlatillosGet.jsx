//const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
const Token= "7059f86a1d940265ab5befed073aa4c03ecb0bd6"

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