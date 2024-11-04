//const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";

export const menuPost = async (pagina_1, pagina_2, pagina_3, pagina_4, pagina_5, pagina_6, pagina_7, pagina_8, restaurante_id) => {
    // Asegúrate de que todos los campos tienen valor y que restaurante_id es el esperado
    console.log({ pagina_1, pagina_2, pagina_3, pagina_4, pagina_5, pagina_6, pagina_7, pagina_8, restaurante_id });

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

        if (!response.ok) {
            console.error("Error al subir las URLs:", response.status, await response.json());
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log("Error al subir las URLs:", error);
    }
};
