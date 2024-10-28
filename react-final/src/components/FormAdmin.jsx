import { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css";
import Select from 'react-select';
import UsedataRest from './UsedataRest';
import { IKContext, IKUpload } from 'imagekitio-react';
import authenticator from '../services/FetchImagekit';
const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const [imageURLPerfil, setImageURLPerfil] = useState(""); // Para la imagen de perfil
  const [imageURLHeader, setImageURLHeader] = useState(""); // Para la imagen de encabezado
  const { t } = useTranslation();
  const { distritos, cantones, especialidades } = UsedataRest(ubicacion.canton);

  // Manejo de cambios
  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value);
    setEspeciSelect(valor);
  };

  // Añadir el restaurante
  const Añadir = async () => {
    if (nomResta.trim() === "" || precioPro.trim() === "" || capacidad.trim() === "" || descripcion.trim() === "" || !ubicacion.canton || !ubicacion.distrito || imageURLPerfil.trim() === "" || imageURLHeader.trim() === "") {
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'Ingrese sus datos de manera correcta',
      });
    } else if (isNaN(precioPro) || isNaN(capacidad)) {
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'El precio promedio y la capacidad deben ser números válidos',
      });
    } else {
      const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
      try {
        await PostResta(nomResta, precioPro, capacidad, descripcion, ubicacion, especialidadesValues, imageURLPerfil, imageURLHeader); // Enviar ambas URLs
        setSwalProps({
          show: true,
          title: 'Éxito!',
          text: 'Restaurante añadido exitosamente',
        });
      } catch (error) {
        setSwalProps({
          show: true,
          title: 'Error',
          text: 'Hubo un error al añadir el restaurante. Por favor, inténtelo de nuevo.',
        });
      }
    }
  };

  // Manejo de errores y éxito en la subida de imagen
  const handleImageUploadError = (err) => {
    console.log("Error subiendo la imagen:", err);
    setSwalProps({
      show: true,
      title: 'Error',
      text: 'Error al subir la imagen. Por favor, inténtelo de nuevo.',
    });
  };

  const handleImageUploadSuccessPerfil = (res) => {
    setImageURLPerfil(res.url); // Guardar la URL de la imagen de perfil subida
    console.log("Imagen de perfil subida exitosamente:", res.url);
  };

  const handleImageUploadSuccessHeader = (res) => {
    setImageURLHeader(res.url); // Guardar la URL de la imagen de encabezado subida
    console.log("Imagen de encabezado subida exitosamente:", res.url);
  };


  
  return (
    <div>
      <div className='Datos'>
        <label>{t('Restaurant name')} : </label>
        <input 
          type="text" 
          placeholder={t('Restaurant')} 
          value={nomResta} 
          onChange={e => setNomresta(e.target.value)} 
        />
        <br />
        <label>{t('Average price')}: </label>
        <input 
          type="text" 
          placeholder={t('Average price')} 
          value={precioPro} 
          onChange={e => setPrecioPro(e.target.value)} 
        />
        <label htmlFor="">{t('Ability')}</label>
        <input 
          type="text" 
          placeholder={t('Ability')} 
          value={capacidad} 
          onChange={e => setCapacidad(e.target.value)} 
        />
        <br />
        <label htmlFor="">{t('description')}</label>
        <input 
          type="text" 
          placeholder={t('description')} 
          value={descripcion} 
          onChange={e => setDescripcion(e.target.value)} 
        />
        <br />
        <label>{t('Specialty')}:</label>
        <Select
          onChange={setEspeciSelect}
          isMulti
          isSearchable
          options={especialidades.map(especialidad => ({
            label: especialidad.descripcion,
            value: especialidad.id_especialidad
          }))}
          className="basic"
        />
        <br />
        <label htmlFor="">Cantones:  </label>
        <select onChange={CambiosCantones}>
          <option value="">Seleccione un canton</option>
          {cantones.map(canton => (
            <option key={canton.id_canton} value={canton.id_canton}>{canton.nombre_canton}</option>
          ))}
        </select>
        <label htmlFor="">Distrito:  </label>
        <select onChange={CambiosDistritos}>
          <option value="">Seleccione un distrito</option>
          {distritos.map(distrito => (
            <option key={distrito.id_distrito} value={distrito.id_distrito}>{distrito.nombre_distrito}</option>
          ))}
        </select>
        {/* Sección para subir la imagen de perfil */}
        <label>Subir imagen de perfil:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessPerfil} // Cambiar a la función de éxito para la imagen de perfil
            authenticator={authenticator}
          />
        </IKContext>
        {/* Sección para subir la imagen de encabezado */}
        <label>Subir imagen de encabezado:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessHeader} // Cambiar a la función de éxito para la imagen de encabezado
            authenticator={authenticator}
          />
        </IKContext>
        <button className='buttonaddadmi' onClick={Añadir}>{t('Add')}</button>
      </div>
      <SweetAlert2 {...swalProps} />
    </div>
  );
};

export default FormAdmin;



