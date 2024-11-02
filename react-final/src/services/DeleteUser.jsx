const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";
//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const DeleteUser = async (usuario_id) => { 
    try {
        const response = await fetch(`http://localhost:8000/api/usersLogin/${usuario_id}/`, {
        method: 'DELETE',
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
export default DeleteUser