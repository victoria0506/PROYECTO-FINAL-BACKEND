import { uploadImage } from "./imageService";
//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1";

const PostResta = async (nombre_restaurante, precio_promedio, capacidad, descripcion, id_distrito, especiSelect, imageURLPerfil, imageURLHeader, latitud_map, longitud_map) => {
    console.log(imageURLPerfil);
    console.log(imageURLHeader);
    
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({
                nombre_restaurante: nombre_restaurante,
                precio_promedio: precio_promedio,
                capacidad: parseFloat(capacidad),
                descripcion: descripcion,
                id_distrito: id_distrito.distrito,
                latitud_map: latitud_map,
                longitud_map: longitud_map,
            })
        });

        const data = await response.json();
        const restauranteId = data.restaurante_id; 
        console.log(data.restaurante_id);
        // Aquí llamamos a la función para subir la imagen
        if (imageURLPerfil && imageURLHeader) {
            console.log(imageURLPerfil);
            console.log(imageURLHeader);
            await uploadImage(imageURLPerfil, imageURLHeader, restauranteId);
        }
        await Promise.all(
            especiSelect.map(async (especialidadId) => {
                await fetch('http://localhost:8000/api/RestaEspecialidades/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${Token}`
                    },
                    body: JSON.stringify({
                        restaurante_id: restauranteId,
                        id_especialidad: especialidadId
                    })
                });
            })
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default PostResta;
