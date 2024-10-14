
const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const userPost = async (nombre_usuario, email, contrasena) => { // funcion del metodo POST
    try {
        const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
            body: JSON.stringify({
             nombre_usuario : nombre_usuario,
             email : email,
             contrasena : contrasena
            })
        });
        const data = await response.json();
        return data
    } catch(error) {
        console.log(error)
    }
}
export default userPost