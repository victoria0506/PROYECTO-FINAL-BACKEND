const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

//obtiene imágenes desde la API
const fetchImagen = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/Imagenes/', {
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
