const Token = "07881b7aeb97068cd9925d768fd3af4b77cb7eab";

const CalendarioPOST = async (dateKey, restauranteId) => {
    console.log(dateKey);
    console.log(restauranteId)
    try {
        const response = await fetch('http://localhost:8000/api/calendario/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`,
            },
            body: JSON.stringify({
                restaurante_id: restauranteId, 
                dia: dateKey,
                // nota: note,
            }),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`La solicitud falló con el estado ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en CalendarioPOST:', error);
        throw error;
    }
};

export default CalendarioPOST