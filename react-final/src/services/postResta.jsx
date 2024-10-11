
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const PostResta = async (nombre_restaurante,precio_promedio,capacidad,calificacion_promedio ,id_distrito,especiSelect) => {
    console.log(especiSelect)
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'POST',
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
        });
        const data = await response.json()
        const restauranteId = data.restaurante_id; 
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
        return data
    } catch(error) {
        console.log(error)
    }
}
export default PostResta