// // src/services/imageService.js

// const privateKey= private_/Kf5OO276GORsVgPp3Fyv9yRAkY=
// const uploadImage = async (file, privateKey) => {
//     const reader = new FileReader();

//     return new Promise((resolve, reject) => {
//         reader.onload = async (event) => {
//             const base64Image = event.target.result.split(',')[1];

//             try {
//                 const response = await fetch('https://ik.imagekit.io/1i7fig3wc/mis-imagenes', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Basic ' + btoa(`${privateKey}:`),
//                     },
//                     body: JSON.stringify({
//                         file: base64Image,
//                         fileName: file.name,
//                     }),
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     resolve(data.url);
//                 } else {
//                     reject(data.message);
//                 }
//             } catch (error) {
//                 reject('Error al subir la imagen');
//             }
//         };

//         reader.readAsDataURL(file);
//     });
// };

// export { uploadImage };
