
const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
const userGET = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/users/', {
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
export default userGET