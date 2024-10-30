const Token = "07881b7aeb97068cd9925d768fd3af4b77cb7eab";

const CalendarioPOST = async ({ dia, restaurante_id, tipo, nota }) => {
    console.log(dia);
    console.log(restaurante_id);
    console.log(tipo);
    console.log(nota);
    try {
        const response = await fetch('http://localhost:8000/api/calendario/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`,
            },
            body: JSON.stringify({
                restaurante_id: restaurante_id, 
                dia: dia,
                tipo: tipo,
                nota: nota,
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

export default CalendarioPOST;