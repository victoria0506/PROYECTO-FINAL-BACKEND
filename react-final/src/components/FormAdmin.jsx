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

const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const [imageURLPerfil, setImageURLPerfil] = useState("");
  const [imageURLHeader, setImageURLHeader] = useState("");
  const { t } = useTranslation();
  const { distritos, cantones, especialidades } = UsedataRest(ubicacion.canton);
  const [restauranteId, setRestauranteId] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [menuImages, setMenuImages] = useState(Array(8).fill("")); // 8 campos para las imágenes del menú
  const [latitud, setLatitud] = useState("")
  const [longitud, setLongitud] = useState("")

  // Manejo de ubicaciones y especialidades
  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (options) => {
    setEspeciSelect(options || []);
  };

  const Añadir = async () => {
    if (
      nomResta.trim() === "" || 
      precioPro.trim() === "" || 
      capacidad.trim() === "" || 
      descripcion.trim() === "" || 
      !ubicacion.canton || 
      !ubicacion.distrito || 
      // imageURLPerfil.trim() === "" || 
      // imageURLHeader.trim() === "" || 
      // latitud.trim() === "" || 
      // longitud.trim() === "" ||
      horarioApertura.trim() === "" || 
      horarioCierre.trim() === "" 
      // ||
      // // menuImages.some(url => url.trim() === "") 
      // // ||
    ) {
      // toast.error(t("Enter all data correctly"));
      return;
    }
    try {
      const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
      const restaNew = await PostResta(
        nomResta, precioPro, capacidad, descripcion,
        ubicacion, especialidadesValues, imageURLPerfil,
        imageURLHeader, horarioApertura, horarioCierre,
        latitud, longitud);
      setRestauranteId(restaNew.restaurante_id);
      toast.success(t('Restaurant added successfully'));

      // Reset de campos
      setNomresta("");
      setPrecioPro("");
      setCapacidad("");
      setDescripcion("");
      setUbicacion({ canton: "", distrito: "" });
      setEspeciSelect([]);
      setImageURLPerfil("");
      setImageURLHeader("");
      setHorarioApertura("");
      setHorarioCierre("");
    } catch (error) {
      console.error("Error al añadir restaurante:", error);
      toast.error(t("Hubo un error al añadir el restaurante. Por favor, inténtelo de nuevo."));
    }
  };

  const handleImageUploadError = (err) => {
    console.error("Error subiendo la imagen:", err);
    toast.error('Error al subir la imagen. Por favor, inténtelo de nuevo.');
  };

  const handleImageUploadSuccessPerfil = (res) => {
    setImageURLPerfil(res.url);
  };

  const handleImageUploadSuccessHeader = (res) => {
    setImageURLHeader(res.url);
  };

  return (
    <div className="form-admin">
      <div className='Datos'>
        <label>{t('Nombre del restaurante')}:</label>
        <input
          type="text"
          placeholder={t('Restaurante')}
          value={nomResta}
          onChange={e => setNomresta(e.target.value)}
        />
        <br />
        <label>{t('Precio promedio')}:</label>
        <input
          type="text"
          placeholder={t('Precio promedio')}
          value={precioPro}
          onChange={e => setPrecioPro(e.target.value)}
        />
        <label>{t('Capacidad')}:</label>
        <input
          type="text"
          placeholder={t('Capacidad')}
          value={capacidad}
          onChange={e => setCapacidad(e.target.value)}
        />
        <br />
        <label>{t('Descripción')}:</label>
        <input
          type="text"
          placeholder={t('Descripción')}
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <br />
        <label>{t('Especialidad')}:</label>
        <Select
          onChange={CambiosEspecialidades}
          isMulti
          isSearchable
          options={especialidades.map(especialidad => ({
            label: especialidad.descripcion,
            value: especialidad.id_especialidad
          }))}
          className="basic"
        />
        <br />
        <label>{t('Cantons')}:</label>
        <select onChange={CambiosCantones}>
          <option value="">Seleccione un canton</option>
          {cantones.map(canton => (
            <option key={canton.id_canton} value={canton.id_canton}>{canton.nombre_canton}</option>
          ))}
        </select>
        <label>{t('District')}:</label>
        <select onChange={CambiosDistritos}>
          <option value="">Seleccione un distrito</option>
          {distritos.map(distrito => (
            <option key={distrito.id_distrito} value={distrito.id_distrito}>{distrito.nombre_distrito}</option>
          ))}
        </select>
        <br />
        <label>{t('Latitude')}:</label>
        <input
          type="text"
          placeholder={t('Latitud')}
          value={latitud}
          onChange={e => setLatitud(e.target.value)}
        />
        <label>{t('Longitud')}:</label>
        <input
          type="text"
          placeholder={t('Longitud')}
          value={longitud}
          onChange={e => setLongitud(e.target.value)}
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
        <br /><br />
        <button onClick={Añadir}>{t('Añadir Restaurante')}</button>
        <br />
        <Calendario restauranteId={restauranteId} />
        <br />
  
        <FormPlatillos restauranteId={restauranteId} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormAdmin;