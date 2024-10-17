// const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const LoginFech = async (email, contrasena) => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/usersLogin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Token}`
        },
        body: JSON.stringify({ email: email, contrasena })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la autenticación');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error durante el login:", error)
    }
}
export default LoginFech