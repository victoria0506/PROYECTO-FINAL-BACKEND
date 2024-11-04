//const Token = "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1";
const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";

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
