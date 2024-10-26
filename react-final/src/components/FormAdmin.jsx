import { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css";
import Select from 'react-select';
import UsedataRest from './UsedataRest';
import { IKContext, IKUpload } from 'imagekitio-react';
import Calendario from './Calendario';
import RestaurantsDetail from './RestaurantsDetail';

const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const [profileImageURL, setProfileImageURL] = useState(""); // URL de la imagen de perfil
  const [headerImageURL, setHeaderImageURL] = useState(""); // URL de la imagen de encabezado
  const { t } = useTranslation();
  const { distritos, cantones, especialidades } = UsedataRest(ubicacion.canton);
  const [restauranteId, setRestauranteId] = useState("")

  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value);
    setEspeciSelect(valor);
  };

  // Añadir el restaurante
  const Añadir = async () => {
    if (nomResta.trim() === "" || precioPro.trim() === "" || capacidad.trim() === "" || descripcion.trim() === "" || !ubicacion.canton || !ubicacion.distrito) {
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'Ingrese sus datos de manera correcta',
      });
    } else {
      const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
      try {
        // Llamar a PostResta con las URLs de las imágenes
        const date = await PostResta(nomResta, precioPro, capacidad, descripcion, ubicacion, especialidadesValues);
        setRestauranteId(date.restaurante_id)
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

  const handleImageUploadSuccessProfile = async (res) => {
    setProfileImageURL(res.url); // Guardar la URL de la imagen de perfil
    // await uploadImage(res.url,restauranteId)
    console.log("Imagen de perfil subida exitosamente:", res.url);
  };
  const handleImageUploadSuccessHeader = (res) => {
    setHeaderImageURL(res.url); // Guardar la URL de la imagen de encabezado
    console.log("Imagen de encabezado subida exitosamente:", res.url);
  };

  const authenticator = async () => {
    try {
      const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1";
      const response = await fetch('http://localhost:8000/api/ImagenApi/', {
        headers: {
          'Authorization': `Token ${Token}`
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
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

        <label>Cantones:  </label>
        <select onChange={CambiosCantones}>
          <option value="">Seleccione un canton</option>
          {cantones.map(canton => (
            <option key={canton.id_canton} value={canton.id_canton}>{canton.nombre_canton}</option>
          ))}
        </select>

        <label>Distrito:  </label>
        <select onChange={CambiosDistritos}>
          <option value="">Seleccione un distrito</option>
          {distritos.map(distrito => (
            <option key={distrito.id_distrito} value={distrito.id_distrito}>{distrito.nombre_distrito}</option>
          ))}
        </select>
  
        <label>Subir imagen de perfil:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessProfile}
            authenticator={authenticator}
            folder='/restaurapp'
          />
        </IKContext>

        <label>Subir imagen de encabezado:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessHeader}
            authenticator={authenticator}
            folder='/restaurapp'
          />
        </IKContext>

        <button className='buttonaddadmi' onClick={Añadir}>{t('Add')}</button>
      </div>
      <SweetAlert2 {...swalProps} />
      <div>
        <Calendario restauranteId={restauranteId}/>
      </div>
    </div>
  );
};

export default FormAdmin;




