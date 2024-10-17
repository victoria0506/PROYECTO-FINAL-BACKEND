//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"

const calificacionPOST = async (restaurante_id, usuario_id, calificacion) => { 
    try {
        const response = await fetch('http://localhost:8000/api/califiRestaur/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
            body: JSON.stringify({
                restaurante_id : restaurante_id,
                usuario_id: usuario_id,
                calificacion: calificacion
            })
        });
        const data = await response.json();
        return data
    } catch(error) {
        console.log(error)
    }
}
export default calificacionPOST