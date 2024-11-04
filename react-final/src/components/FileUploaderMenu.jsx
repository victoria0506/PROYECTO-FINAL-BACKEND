// Importamos el hook useState de React para manejar el estado del componente
import { useState } from 'react';
// Importamos los componentes IKContext e IKUpload de ImageKit para manejar la carga de imágenes
import { IKContext, IKUpload } from 'imagekitio-react';
// Importamos el autenticador para ImageKit
import authenticator from '../services/FetchImagekit';
// Importamos la función para guardar el menú
import { menuPost } from '../services/menuPost';

// Definimos el componente FileUploaderMenu, que recibe un ID de restaurante como propiedad
const FileUploaderMenu = ({ restauranteId }) => {
  // Usamos el hook useState para definir el estado de las imágenes del menú, inicializándolo con un arreglo de 8 elementos nulos
  const [menuImages, setMenuImages] = useState(Array(8).fill(null));

  // Manejo de errores de carga de imágenes
  const handleImageUploadError = (err) => {
    console.error("Error subiendo la imagen:", err); // Mostramos el error en la consola
  };

  // Manejo de éxito en la carga de imágenes
  const handleImageUploadSuccess = (res, index) => {
    const newImageUrl = res.url; // Obtenemos la URL de la imagen subida
    const updatedImages = [...menuImages]; // Creamos una copia del arreglo de imágenes
    updatedImages[index] = newImageUrl; // Actualizamos la imagen en la posición correspondiente
    setMenuImages(updatedImages); // Actualizamos el estado con las nuevas imágenes
  };

  // Guardar imágenes del menú
  const saveMenuImages = async () => {
    try {
      const imagesToSend = menuImages.map((img) => img || ""); // Creamos un arreglo con las imágenes, reemplazando nulos por cadenas vacías
      if (!restauranteId) {
        console.error("restauranteId no está definido"); // Mostramos un error si no se ha definido el ID del restaurante
        return;
      }

      const response = await menuPost(...imagesToSend, restauranteId); // Llamamos a la función para guardar las imágenes en el servidor
      if (response) {
        console.log("Menú guardado exitosamente:", response); // Mostramos un mensaje de éxito
      } else {
        console.error("Error en la respuesta del servidor"); // Mostramos un error si la respuesta es vacía
      }
    } catch (error) {
      console.error("Error al guardar el menú:", error); // Mostramos cualquier error que ocurra al guardar el menú
    }
  };

  // Si no hay restauranteId, mostrar un mensaje o nada
  if (!restauranteId) {
    return <p>Por favor, agrega un restaurante antes de subir el menú.</p>; // Mensaje de advertencia si no hay ID de restaurante
  }

  return (
    <div className="file-uploader-menu">
      {/* Título de la sección para subir imágenes del menú */}
      <h3>Subir imágenes del menú</h3>
      {/* Configuración del contexto de ImageKit para subir imágenes */}
      <IKContext 
        publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o="
        urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/"
        authenticator={authenticator}
      >
        {/* Mapeamos un arreglo de 8 elementos para crear un uploader para cada página del menú */}
        {[...Array(8)].map((_, index) => (
          <div key={index}>
            {/* Indicación para el usuario sobre qué página está subiendo */}
            <p>Subir página {index + 1}</p>
            {/* Componente para subir la imagen usando ImageKit */}
            <IKUpload
              onError={handleImageUploadError} // Función para manejar errores de carga
              onSuccess={(res) => handleImageUploadSuccess(res, index)} // Función para manejar el éxito de la carga
            />
          </div>
        ))}
      </IKContext>
      
      {/* Botón para guardar las imágenes del menú en el servidor */}
      <button onClick={saveMenuImages}>Guardar Menú</button>
    </div>
  );
};

// Exportamos el componente FileUploaderMenu para que pueda ser utilizado en otras partes de la aplicación
export default FileUploaderMenu;











