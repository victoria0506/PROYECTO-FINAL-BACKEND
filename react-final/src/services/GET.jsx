const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

const GET = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/usersRegistro/', {
        method: 'GET',
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
export default GET