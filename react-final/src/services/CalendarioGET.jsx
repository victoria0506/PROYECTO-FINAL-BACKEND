// const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

const CalendarioGET = async (restauranteId) => { // funcion del metodo GET
    try {
        const response = await fetch(`http://localhost:8000/api/calendario/?restaurante_id=${restauranteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
        });
        const data = await response.json();
        return(data)
        } catch(error) {
        console.log(error)
    }
}


export default CalendarioGET