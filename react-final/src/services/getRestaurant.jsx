//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

// const RestaGet = async () => {
//     try {
//         const response = await fetch('http://localhost:8000/api/admiRestaur/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${Token}`
//             },
//         });

//         const restaurantes = await response.json();
        
//         // Obtener imágenes
//         const responseImages = await fetch('http://localhost:8000/api/ImagenApi/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${Token}`
//             }
//         });

//         const imagenes = await responseImages.json();

//         // Verificar que `imagenes` es un array
//         if (!Array.isArray(imagenes)) {
//             throw new TypeError("La respuesta de imágenes no es un array");
//         }

//         // Asociar imágenes con restaurantes
//         const restaurantesConImagenes = restaurantes.map(restaurante => ({
//             ...restaurante,
//             imagenes: imagenes.filter(imagen => imagen.restaurante_id === restaurante.restaurante_id)
//         }));

//         return restaurantesConImagenes;

//     } catch (error) {
//         console.error("Error al obtener restaurantes:", error);
//         throw error;
//     }
// };

// export default RestaGet;

const RestaGet = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
        });

        if (!response.ok) {
            throw new Error('Error al obtener restaurantes');
        }

        const restaurantes = await response.json();
        return restaurantes;

    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        throw error; 
    }
};

export default RestaGet;