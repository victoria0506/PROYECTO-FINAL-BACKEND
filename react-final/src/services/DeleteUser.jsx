// const Token = "a53ecb17b9b53418b44507fe226c0cf6490508f1";
const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"

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