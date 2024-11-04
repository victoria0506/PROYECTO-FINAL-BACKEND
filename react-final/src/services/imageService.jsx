const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";
//const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"

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
