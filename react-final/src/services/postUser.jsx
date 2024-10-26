//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
 const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"

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