const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";

export const uploadImage = async (url_img, url_header, tipo_imagen, restaurante_id) => {
    console.log(url_img);
    console.log(restaurante_id);
    console.log(url_header);
    try {
        const response = await fetch('http://localhost:8000/api/Imagenes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({
                url_img: url_img,
                url_header: url_header,
                tipo_imagen: tipo_imagen, // Solo envía los datos necesarios
                restaurante_id: restaurante_id
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al subir la imagen:", errorData);
            return;
        }

        return await response.json();
    } catch (error) {
        console.log("Error al subir la imagen:", error);
    }
};
