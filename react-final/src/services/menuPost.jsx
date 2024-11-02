const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";



export const menuPost = async (pagina_1, pagina_2, pagina_3, pagina_4, pagina_5, pagina_6, pagina_7, pagina_8, restaurante_id) => {
    console.log(typeof restaurante_id);
    console.log(pagina_1);
    console.log(pagina_2);
    console.log(pagina_3);
    console.log(pagina_4);
    console.log(pagina_5);
    console.log(pagina_6);
    console.log(pagina_7);
    console.log(pagina_8);
    try {
        const response = await fetch('http://localhost:8000/api/menu/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({
             pagina_1: pagina_1,
             pagina_2: pagina_2,
             pagina_3: pagina_3,
             pagina_4: pagina_4, 
             pagina_5: pagina_5, 
             pagina_6: pagina_6,
             pagina_7: pagina_7,
             pagina_8: pagina_8,
             restaurante_id: restaurante_id
            })
            
        });
        return await response.json();
    } catch (error) {
        console.log("Error al subir las urls:", error);
    }
};

export default menuPost