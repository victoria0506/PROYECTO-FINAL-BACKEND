const calificacionPOST = async (restaurante_id, usuario_id, calificacion) => { 
    try {
        const response = await fetch('http://localhost:8000/api/califiRestaur/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
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