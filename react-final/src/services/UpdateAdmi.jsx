const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const PutRestaur = async (restaurante_id,nombre_restaurante,precio_promedio,capacidad,calificacion_promedio ,id_distrito, especiSelect) => { 
    try {
        const response = await fetch(`http://localhost:8000/api/admiRestaur/${restaurante_id}/`, {
        method: 'PUT',
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
        const data = await response.json();
        return (data)
        } catch(error) {
        console.log(error)
        alert("Error del servidor, por favor intente después")
    } 
}

export default PutRestaur