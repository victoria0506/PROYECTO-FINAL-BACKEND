// services/getImages.js

const API_URL = "http://localhost:8000/api/Imagenes/";

const getImages = async (restaurante_id) => {
    try {
        const response = await fetch(`${API_URL}?restaurante_id=${restaurante_id}`);
        
        if (!response.ok) {
            throw new Error("Error al obtener las imágenes");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default getImages;
