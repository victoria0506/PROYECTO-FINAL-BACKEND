const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token= "7059f86a1d940265ab5befed073aa4c03ecb0bd6"


const fetchImagen = async (restaurante_id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/Imagenes/?restaurante_id=${restaurante_id}`, {
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

export default fetchImagen

