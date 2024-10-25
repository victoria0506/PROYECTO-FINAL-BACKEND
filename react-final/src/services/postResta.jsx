//const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

const PostResta = async (nombre_restaurante,precio_promedio,capacidad,descripcion,id_distrito,especiSelect) => {
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
            body: JSON.stringify({
                nombre_restaurante: nombre_restaurante,
                precio_promedio: precio_promedio,
                capacidad: parseFloat(capacidad),
                descripcion: descripcion,
                id_distrito: id_distrito.distrito
            })
        });
        const data = await response.json()
        const restauranteId = data.restaurante_id; 
        console.log(data.restaurante_id);
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