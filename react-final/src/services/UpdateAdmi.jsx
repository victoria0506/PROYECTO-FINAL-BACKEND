const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const PutRestaur = async (restaurante_id,nombre_restaurante,precio_promedio,capacidad,calificacion_promedio ,id_distrito, especiSelect) => { 
    try {
        const response = await fetch(`http://localhost:8000/api/admiRestaur/${restaurante_id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
            body: JSON.stringify({
                nombre_restaurante: nombre_restaurante,
                precio_promedio: parseFloat(precio_promedio),
                capacidad: parseFloat(capacidad),
                calificacion_promedio: calificacion_promedio,
                id_distrito: id_distrito.distrito
            })
        })
        const data = await response.json();
        const restauranteId = data.restaurante_id; 
        await Promise.all(
            especiSelect.map(async (especialidadId) => {
                await fetch(`http://localhost:8000/api/RestaEspecialidades/${restaurante_id}/`, {
                method: 'PUT',
                credentials: 'include',
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
        return (data)
    } catch(error) {
        console.log(error)
        alert("Error del servidor, por favor intente después")
    } 
}

export default PutRestaur