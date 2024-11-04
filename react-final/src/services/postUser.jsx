const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"


const userPost = async (nombre_usuario, email, contrasena) => { // funcion del metodo POST
    try {
        const response = await fetch('http://localhost:8000/api/usersRegistro/', {
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