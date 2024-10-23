const CalifiGET = async (accessToken) => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/califiRestaur/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`, 
        },
        });
        const data = await response.json();
        return(data)
        } catch(error) {
        console.log(error)
    }
}
export default CalifiGET