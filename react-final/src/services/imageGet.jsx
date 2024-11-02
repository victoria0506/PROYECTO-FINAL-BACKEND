const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"
//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

// Obtiene imágenes desde la API
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

