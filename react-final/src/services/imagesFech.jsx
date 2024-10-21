const Token= "d58379a2f75349bbb55f641fd6c323527b1f495a"

export const FechImg = async (imageFile, restauranteId) => {
    
    const formData = new FormData();
    formData.append('img', imageFile);
    formData.append('restaurante_id', restauranteId);

    const response = await fetch('http://localhost:8000/api/Imagenes/', {
        method: 'POST',
        credentials: 'include',
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
