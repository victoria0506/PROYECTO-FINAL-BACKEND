// const Token = "a53ecb17b9b53418b44507fe226c0cf6490508f1";

// export const uploadImage = async (url_img, restaurante_id) => {
//     const formData = new FormData();
//     formData.append('url_img', url_img);
//     formData.append('restaurante_id', restaurante_id);
//     console.log(formData);
//     try {
//         const response = await fetch('http://localhost:8000/api/ImagenApi/', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${Token}`,
//             },
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Error en la subida de la imagen');
//         }

//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error('Error al subir la imagen:', error);
//         throw error; 
//     }
// };

