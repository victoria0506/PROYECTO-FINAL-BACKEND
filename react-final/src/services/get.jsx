//const token = '9900a0a1e563312075e1f7dbb18043a01e52bc0a'

const GETuser = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${"414e16e23b7c7755b7eb60d338737826a8d6c0ba"}`
        },
        });
        const data = await response.json();
        return(data)
        } catch(error) {
        console.log(error)
    }
}
export default GETuser