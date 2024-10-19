const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

export const FechImg = async (imageFile, restauranteId) => {
    
    const formData = new FormData();
    formData.append('img', imageFile);
    formData.append('restaurante_id', restauranteId);

    const response = await fetch('http://localhost:8000/api/Imagenes/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${Token}`, 
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while uploading the image.');
    }

    return await response.json();
};
