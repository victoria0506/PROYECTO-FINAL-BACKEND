const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
// const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";

export const PlatilloPost = async (restauranteId,urlPlatillo1, urlPlatillo2, urlPlatillo3,urlPlatillo4) => {
    console.log(typeof restauranteId);
    console.log(urlPlatillo1);
    console.log(urlPlatillo2);
    console.log(urlPlatillo3);
    console.log(urlPlatillo4);
    try {
        const response = await fetch('http://localhost:8000/api/Platillos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({
                restaurante_id: restauranteId,
                url_platillo_1: urlPlatillo1,
                url_platillo_2: urlPlatillo2,
                url_platillo_3: urlPlatillo3,
                url_platillo_4: urlPlatillo4,
            })
        });
        return await response.json();
    } catch (error) {
        console.log("Error al subir las urls:", error);
    }
};

export default PlatilloPost