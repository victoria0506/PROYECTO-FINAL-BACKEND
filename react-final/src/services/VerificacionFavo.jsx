
// const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

// const verificarFavorito = async (usuario_id, restaurante_id) => {
//     try {
//         const response = await fetch(`http://localhost:8000/api/favoritos/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${Token}`, 
//             },
//         });
//         console.log(usuario_id);
        
//         if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const favoritos = await response.json();
//         console.log("Favoritos del usuario:", favoritos); 

//         if (Array.isArray(favoritos)) {
//             return favoritos.some(favorito => favorito.restaurante_id === restaurante_id);
//         } else {
//             console.error("La respuesta no es un array:", favoritos);
//             return false;
//         }
//     } catch (error) {
//         console.error("Error al verificar favoritos:", error);
//         return false; // Si hay un error, asumimos que no está en favoritos
//     }
// };

// export default verificarFavorito