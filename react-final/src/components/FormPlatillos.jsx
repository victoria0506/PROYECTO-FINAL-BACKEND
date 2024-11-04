import { useState } from "react"
import { IKContext, IKUpload } from 'imagekitio-react';
import PlatilloPost from "../services/PlatillosPost";
import authenticator from '../services/FetchImagekit';
import { t } from "i18next";

const FormPlatillos = ({restauranteId}) => {
    const [urlPlatillo1, setUrlPlatillo1] = useState("");
    const [urlPlatillo2, setUrlPlatillo2] = useState("");
    const [urlPlatillo3, setUrlPlatillo3] = useState("");
    const [urlPlatillo4, setUrlPlatillo4] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Datos de platillo a enviar:", restauranteId, urlPlatillo1, urlPlatillo2, urlPlatillo3, urlPlatillo4)
        await PlatilloPost(restauranteId, urlPlatillo1, urlPlatillo2, urlPlatillo3, urlPlatillo4)
    }

    const handleImageUploadError = (err) => {
        console.log("Error subiendo la imagen:", err);
        toast.error('Error al subir la imagen. Por favor, inténtelo de nuevo.')
      };

    const handleImageUploadSuccess1 = (res) => {
        setUrlPlatillo1(res.url)
        console.log("Imagen de platillo 1 subida exitosamente:", res.url);
    }

    const handleImageUploadSuccess2 = (res) => {
        setUrlPlatillo2(res.url)
        console.log("Imagen de platillo 2 subida exitosamente:", res.url);
    }

    const handleImageUploadSuccess3 = (res) => {
        setUrlPlatillo3(res.url)
        console.log("Imagen de platillo 3 subida exitosamente:", res.url);
    }

    const handleImageUploadSuccess4 = (res) => {
        setUrlPlatillo4(res.url)
        console.log("Imagen de platillo 4 subida exitosamente:", res.url);
    }

return (
        <form onSubmit={handleSubmit}>
          {/* Subida de imagenes con IKUpload */}
          <label>{t('Image 1 :')}</label>
          <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
            <IKUpload 
            onError={handleImageUploadError} 
            onSuccess={handleImageUploadSuccess1} 
            authenticator={authenticator}
            />
          </IKContext>
    
          <label>{t('Image 2 :')}</label>
          <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
            <IKUpload 
            onError={handleImageUploadError} 
            onSuccess={handleImageUploadSuccess2} 
            authenticator={authenticator}
            />
          </IKContext>
    
          <label>{t('Image 3 :')}</label>
          <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
            <IKUpload 
            onError={handleImageUploadError} 
            onSuccess={handleImageUploadSuccess3} 
            authenticator={authenticator}
            />
          </IKContext>
    
          <label>{t('Image 4 :')}</label>
          <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
            <IKUpload 
            onError={handleImageUploadError} 
            onSuccess={handleImageUploadSuccess4} 
            authenticator={authenticator}
            />
          </IKContext>
          <br /><br />
          <button className="añaplatillos" type="submit">{t("Save Featured Dish")}</button>
        </form>
    );    
}

export default FormPlatillos
