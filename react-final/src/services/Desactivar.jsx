const Token = "07881b7aeb97068cd9925d768fd3af4b77cb7eab";

export const DesactivarResta = async (restauranteId) => {
    try {
        const response = await fetch(`http://localhost:8000/api/admiRestaur/${restauranteId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Token}`
            },
            body: JSON.stringify({ activo: false })
        });

        if (!response.ok) {
            throw new Error('Error al desactivar el restaurante');
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error al desactivar el restaurante:", error);
        throw error;
    }
};
