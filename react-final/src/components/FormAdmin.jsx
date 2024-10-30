import { useState } from 'react';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css";
import Select from 'react-select';
import UsedataRest from './UsedataRest';
import { IKContext, IKUpload } from 'imagekitio-react';
import authenticator from '../services/FetchImagekit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendario from './Calendario';

const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const [imageURLPerfil, setImageURLPerfil] = useState("");
  const [imageURLHeader, setImageURLHeader] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const { t } = useTranslation();
  const { distritos, cantones, especialidades } = UsedataRest(ubicacion.canton);

  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value);
    setEspeciSelect(valor);
  };

  const Añadir = async () => {
    // Validaciones
    if (
      nomResta.trim() === "" || 
      precioPro.trim() === "" || 
      capacidad.trim() === "" || 
      descripcion.trim() === "" || 
      !ubicacion.canton || 
      !ubicacion.distrito || 
      imageURLPerfil.trim() === "" || 
      imageURLHeader.trim() === "" || 
      latitud.trim() === "" || 
      longitud.trim() === ""
    ) {
      toast.error("Ingrese todos los datos de manera correcta");
      return;
    }

    // Validar que precioPro y capacidad sean números
    if (isNaN(precioPro) || isNaN(capacidad)) {
      toast.error('El precio promedio y la capacidad deben ser números válidos');
      return;
    }

    // Validar latitud y longitud
    const latNum = parseFloat(latitud);
    const lngNum = parseFloat(longitud);
    if (latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
      toast.error('Latitud y longitud deben ser valores válidos');
      return;
    }

    const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
    try {
      await PostResta(nomResta, precioPro, capacidad, descripcion, ubicacion, especialidadesValues, imageURLPerfil, imageURLHeader, latitud, longitud);
      toast.success('Restaurante añadido exitosamente');

      // Limpiar campos después de agregar
      setNomresta("");
      setPrecioPro("");
      setCapacidad("");
      setDescripcion("");
      setUbicacion({ canton: "", distrito: "" });
      setEspeciSelect([]);
      setImageURLPerfil("");
      setImageURLHeader("");
      setLatitud("");
      setLongitud("");
    } catch (error) {
      toast.error('Hubo un error al añadir el restaurante. Por favor, inténtelo de nuevo.');
    }
  };

  const handleImageUploadError = (err) => {
    console.log("Error subiendo la imagen:", err);
    toast.error('Error al subir la imagen. Por favor, inténtelo de nuevo.');
  };

  const handleImageUploadSuccessPerfil = (res) => {
    setImageURLPerfil(res.url);
    console.log("Imagen de perfil subida exitosamente:", res.url);
  };

  const handleImageUploadSuccessHeader = (res) => {
    setImageURLHeader(res.url);
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
        <label htmlFor="">{t('Description')}</label>
        <input 
          type="text" 
          placeholder={t('Description')} 
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
        <br />
        <label htmlFor="">Latitud:</label>
        <input 
          type="text" 
          placeholder="Ingrese la latitud" 
          value={latitud} 
          onChange={e => setLatitud(e.target.value)} 
        />
        <br />
        <label htmlFor="">Longitud:</label>
        <input 
          type="text" 
          placeholder="Ingrese la longitud" 
          value={longitud} 
          onChange={e => setLongitud(e.target.value)} 
        />
        <br />
        <label>Subir imagen de perfil:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessPerfil}
            authenticator={authenticator}
          />
        </IKContext>
        <label>Subir imagen de encabezado:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessHeader}
            authenticator={authenticator}
          />
        </IKContext>
        <button onClick={Añadir}>{t('Add restaurant')}</button>
        <ToastContainer />
      </div>
      <Calendario />
    </div>
  );
};

export default FormAdmin;


