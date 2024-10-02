const userGET = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${"0a968f1cbf25943e00df30b2a18676627291a2a2"}`
        },
        });
        const data = await response.json();
        return(data)
        } catch(error) {
        console.log(error)
    }
}
export default userGET