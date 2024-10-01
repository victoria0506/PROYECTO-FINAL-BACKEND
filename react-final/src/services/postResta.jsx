
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const PostResta = async (nombre_restaurante,precio_promedio,especialidad,capacidad,calificacion_promedio ,id_distrito) => {
    console.log("ID del distrito en PostResta:", id_distrito);
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
                especialidad: especialidad,
                capacidad: parseFloat(capacidad),
                calificacion_promedio: calificacion_promedio,
                id_distrito: id_distrito.distrito
            })
        });
        const data = await response.json();
        return data
        } catch(error) {
        console.log(error)
    }
}
export default PostResta