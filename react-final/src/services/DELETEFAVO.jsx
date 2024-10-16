const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
// const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const deleteRestau = async (restaurante_id) => { 
    console.log(restaurante_id);
    console.log("Tipo de favorito_id:", typeof restaurante_id);
    try {
        const response = await fetch(`http://localhost:8000/api/favoritos/${restaurante_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Token ${Token}`
        },
        });
        const data = await response.json();
        return(data)
        } catch(error) {
        console.log(error)
    } 
}
export default deleteRestau
