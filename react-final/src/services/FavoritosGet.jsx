
const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const favoritosGET = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/favoritos/', {
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
export default favoritosGET