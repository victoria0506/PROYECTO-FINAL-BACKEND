import { uploadImage } from "./imageService";

const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";


const PostResta = async (
    nombre_restaurante, precio_promedio, capacidad, descripcion,
    ubicacion, especiSelect, imageURLPerfil,
    imageURLHeader, horarioApertura, horarioCierre,
    latitud, longitud, menuImages // Nuevo parámetro para las imágenes del menú
) => {
    console.log(nombre_restaurante, precio_promedio, capacidad, descripcion, ubicacion, horarioApertura, horarioCierre, especiSelect, imageURLPerfil, imageURLHeader, latitud, longitud);
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({
                nombre_restaurante,
                precio_promedio,
                capacidad: parseFloat(capacidad),
                descripcion,
                id_distrito: ubicacion.distrito,
                horario_apertura: horarioApertura,
                horario_cierre: horarioCierre,
                latitud_map: latitud,
                longitud_map: longitud
            })
        });

        const data = await response.json();
        const restauranteId = data.restaurante_id;
        console.log("Nuevo ID de Restaurante:", restauranteId);

        // Subir imágenes si están disponibles
        if (imageURLPerfil && imageURLHeader) {
            await uploadImage(imageURLPerfil, imageURLHeader, "perfil", restauranteId);
        }

        // Subir especialidades
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

        // Crear el menú de imágenes para el restaurante
        if (menuImages && menuImages.length > 0) {
            await fetch('http://localhost:8000/api/menu/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Token}`
                },
                body: JSON.stringify({
                    restaurante_id: restauranteId,
                    pagina_1: menuImages[0],
                    pagina_2: menuImages[1],
                    pagina_3: menuImages[2],
                    pagina_4: menuImages[3],
                    pagina_5: menuImages[4],
                    pagina_6: menuImages[5],
                    pagina_7: menuImages[6],
                    pagina_8: menuImages[7]
                })
            });
        }

        return data;
    } catch (error) {
        console.error("Error al añadir restaurante:", error);
    }
};

export default PostResta;


