//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
const RestaGet = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
        });
        const restaurantes = await response.json();
        // Ahora obtendremos las imágenes para cada restaurante
        const responseImages = await fetch('http://localhost:8000/api/Imagenes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}` // Añadir el token en el encabezado
            }
        });
        const imagenes = await responseImages.json();
        // Asociar imágenes con restaurantes
        const restaurantesConImagenes = restaurantes.map(restaurante => ({
            ...restaurante,
            imagenes: imagenes.filter(imagen => imagen.restaurante_id === restaurante.restaurante_id) // Filtramos las imágenes por restaurante
        }));
        return restaurantesConImagenes;
    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        throw error; // Devolvemos el error para manejarlo en la parte de la UI
    }
};

export default RestaGet;
