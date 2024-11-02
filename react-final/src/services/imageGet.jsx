const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

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

