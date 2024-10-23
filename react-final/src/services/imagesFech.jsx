
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('imageFile', file);
    try {
        const response = await fetch('https://ik.imagekit.io/sox1oxatj/restaurapp', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error en la subida de la imagen');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; 
    }
};

