// const Token = "07881b7aeb97068cd9925d768fd3af4b77cb7eab";
const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";

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
