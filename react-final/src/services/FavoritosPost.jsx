const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const favoritosRestaurants = async (usuario_id, restaurante_id) => { // funcion del metodo POST
    try {
        const response = await fetch('http://localhost:8000/api/favoritos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
            body: JSON.stringify({
                usuario_id: usuario_id,
                restaurante_id: restaurante_id
            })
        });
        const data = await response.json();
        return data
    } catch(error) {
        console.log(error)
    }
}
export default favoritosRestaurants