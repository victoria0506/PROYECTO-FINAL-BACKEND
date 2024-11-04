const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";


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