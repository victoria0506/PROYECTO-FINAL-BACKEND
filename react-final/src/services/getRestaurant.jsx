// const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"
const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
const RestaGet = async () => { // funcion del metodo GET
    try {
        const response = await fetch('http://localhost:8000/api/admiRestaur/', {
        method: 'GET',
        // credentials: 'include',
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
export default RestaGet