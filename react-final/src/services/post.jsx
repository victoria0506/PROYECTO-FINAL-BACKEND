const userPost = async (name, email) => { // funcion del metodo POST
    try {
        const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
             name : name,
             email : email
            })
        });
        const data = await response.json();
        return data
        } catch(error) {
        console.log(error)
    }
}
export default userPost