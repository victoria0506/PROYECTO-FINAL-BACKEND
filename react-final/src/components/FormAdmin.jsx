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
import FormPlatillos from './FormPlatillos';
import MenuRestaurantes from './MenuRestaurantes';
import Map from './Map'; // Importar el componente de mapa

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
  const [restauranteId, setRestauranteId] = useState("")
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");


  const [menuImages, setMenuImages] = useState(Array(8).fill("")); // 8 campos para las imágenes del menú
  
  // Coordenadas
  const [coordenadas, setCoordenadas] = useState({ lat: '', lng: '' }); // Estado para las coordenadas

  // Funciones para manejar cambios en los select
  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value);
    setEspeciSelect(valor);
  };

  const Añadir = async () => {
    // Validación de campos
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
      longitud.trim() === "" ||
      horarioApertura.trim() === "" || 
      horarioCierre.trim() === "" ||
      precioPro.trim("") === "" ||
      menuImages.some(url => url.trim() === "") ||
      coordenadas.lat.trim() === "" || // Validar latitud
      coordenadas.lng.trim() === "" // Validar longitud

    ) {
      toast.error(t("Enter all data correctly"));
      return;
    }
    // Validar latitud y longitud
    const latNum = parseFloat(latitud);
    const lngNum = parseFloat(longitud);
    if (latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
      toast.error(t('Latitude and longitude must be valid values'));

    if (isNaN(precioPro) || isNaN(capacidad) || isNaN(coordenadas.lat) || isNaN(coordenadas.lng)) {
      toast.error('El precio promedio, la capacidad, y las coordenadas deben ser números válidos');

      return; 
    }

    const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
    try {
      const restaNew = await PostResta(nomResta, precioPro, capacidad, descripcion, ubicacion, especialidadesValues, imageURLPerfil, imageURLHeader, latitud, longitud, horarioApertura, horarioCierre, menuImages, coordenadas);
      setRestauranteId(restaNew.restaurante_id)
      toast.success(t('Restaurant added successfully'));

      // Limpiar campos después de añadir
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
      setHorarioApertura("");
      setHorarioApertura("")
      setMenuImages(Array(8).fill("")); 
      setCoordenadas({ lat: '', lng: '' }); // Limpiar coordenadas
    } catch (error) {
      toast.error(t("errorAddingRestaurant"));
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

  const handleMenuImageUploadSuccess = (index) => (res) => {
    const updatedMenuImages = [...menuImages];
    updatedMenuImages[index] = res.url; // Agregar URL al índice correspondiente
    setMenuImages(updatedMenuImages);
    console.log(`Imagen de menú ${index + 1} subida exitosamente:`, res.url);
  };

  return (
    <div className="form-admin">
      <div className='Datos'>
        <label>{t('Nombre del restaurante')} : </label>
        <input 
          type="text" 
          placeholder={t('Restaurante')} 
          value={nomResta} 
          onChange={e => setNomresta(e.target.value)} 
        />
        <br />
        <label>{t('Precio promedio')}: </label>
        <input 
          type="text" 
          placeholder={t('Precio promedio')} 
          value={precioPro} 
          onChange={e => setPrecioPro(e.target.value)} 
        />
        <label htmlFor="">{t('Capacidad')}</label>
        <input 
          type="text" 
          placeholder={t('Capacidad')} 
          value={capacidad} 
          onChange={e => setCapacidad(e.target.value)} 
        />
        <br />
        <label htmlFor="">{t('Descripción')}</label>
        <input 
          type="text" 
          placeholder={t('Descripción')} 
          value={descripcion} 
          onChange={e => setDescripcion(e.target.value)} 
        />
        <br />
        <label>{t('Especialidad')}:</label>
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
        <label htmlFor="">{t('Cantons')} : </label>
        <select onChange={CambiosCantones}>
          <option value="">Seleccione un canton</option>
          {cantones.map(canton => (
            <option key={canton.id_canton} value={canton.id_canton}>{canton.nombre_canton}</option>
          ))}
        </select>
        <label htmlFor="">{t('District')} : </label>
        <select onChange={CambiosDistritos}>
          <option value="">Seleccione un distrito</option>
          {distritos.map(distrito => (
            <option key={distrito.id_distrito} value={distrito.id_distrito}>{distrito.nombre_distrito}</option>
          ))}
        </select>

        <br />
        <label htmlFor="">Coordenadas:</label>
        <input 
          type="text" 
          placeholder={t('Latitud')} 
          value={coordenadas.lat} 
          onChange={e => setCoordenadas({ ...coordenadas, lat: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder={t('Longitud')} 
          value={coordenadas.lng} 
          onChange={e => setCoordenadas({ ...coordenadas, lng: e.target.value })} 
        />
        <br />
        <label>{t('Opening hours')}:</label>
          <input 
            type="time" 
            value={horarioApertura} 
            onChange={e => setHorarioApertura(e.target.value)} 
          />
        <br />
        <label>{t('Closing hours')}:</label>
          <input 
            type="time" 
            value={horarioCierre} 
            onChange={e => setHorarioCierre(e.target.value)} 
          />
        <br /><br />
        <label>{t('Upload profile image')}:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessPerfil}
            authenticator={authenticator}
          />
        </IKContext>
        <label>{t('Upload header image')}:</label>
        <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessHeader}
            authenticator={authenticator}
          />
        </IKContext>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <label>Subir imagen de menú {index + 1}:</label>
            <IKContext publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o=" urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/">
              <IKUpload
                onError={handleImageUploadError}
                onSuccess={handleMenuImageUploadSuccess(index)}
                authenticator={authenticator}
              />
            </IKContext>
          </div>
        ))}
        <button onClick={Añadir}>{t('Añadir Restaurante')}</button>
      </div>
      <ToastContainer />
      <Map coordenadas={coordenadas} /> {/* Componente de mapa */}
    </div>
  );
};
}

export default FormAdmin;
