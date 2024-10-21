const CaliPut = async (calificacion_id, usuario_id, restaurante_id, calificacion) => { 
    try {
        const response = await fetch(`http://localhost:8000/api/califiRestaur/${calificacion_id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                usuario_id: usuario_id,
                restaurante_id: restaurante_id,
                calificacion: calificacion
            })
        });
        const data = await response.json();
        return (data)
        } catch(error) {
        console.log(error)
        alert("Error del servidor, por favor intente después")
    } 
}

export default CaliPut