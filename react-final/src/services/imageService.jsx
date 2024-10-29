// const Token = "a53ecb17b9b53418b44507fe226c0cf6490508f1";
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
//subir imagen a db
export const uploadImage = async (url_img,url_header,restaurante_id, tipo_imagen) => {
    console.log(url_img);
    console.log(restaurante_id)
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
                restaurante_id: restaurante_id,
                tipo_imagen: tipo_imagen, // Solo envía los datos necesarios
                
            })
        });
        return await response.json();
    } catch (error) {
        console.log("Error al subir la imagen:", error);
    }
};
