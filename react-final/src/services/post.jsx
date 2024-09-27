
const userPost = async (nombre_usuario, email, contrasena, token) => { // funcion del metodo POST
    try {
        const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${"414e16e23b7c7755b7eb60d338737826a8d6c0ba"}`
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