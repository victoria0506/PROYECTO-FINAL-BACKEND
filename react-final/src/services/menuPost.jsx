const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";



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
