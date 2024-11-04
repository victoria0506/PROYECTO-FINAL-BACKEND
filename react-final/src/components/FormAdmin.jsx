import { useState } from 'react';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css";
import Select from 'react-select';
import UsedataRest from './UsedataRest';
import { IKContext, IKUpload } from 'imagekitio-react';
import authenticator from '../services/FetchImagekit';
import Calendario from './Calendario';
import FormPlatillos from './FormPlatillos';
import FileUploaderMenu from './FileUploaderMenu';
import toastr from 'toastr'; // Importar Toastr
import 'toastr/build/toastr.min.css'; // Importar estilos de Toastr

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
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  // Manejo de ubicaciones y especialidades
  const CambiosDistritos = (e) => setUbicacion({ ...ubicacion, distrito: e.target.value });
  const CambiosCantones = (e) => setUbicacion({ canton: e.target.value, distrito: "" });
  const CambiosEspecialidades = (options) => {
    setEspeciSelect(options || []);
  };

  // Función para añadir un nuevo restaurante
  const Añadir = async () => {
    // Validar que todos los campos estén llenos
    if (
      nomResta.trim() === "" || 
      precioPro.trim() === "" || 
      capacidad.trim() === "" || 
      descripcion.trim() === "" || 
      !ubicacion.canton || 
      !ubicacion.distrito || 
      horarioApertura.trim() === "" || 
      horarioCierre.trim() === ""
    ) {
      toastr.error(t("Enter all data correctly")); // Usar Toastr para mostrar error
      return;
    }
    try {
      // Obtener los valores de especialidades seleccionadas
      const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
      const restaNew = await PostResta(
        nomResta, precioPro, capacidad, descripcion,
        ubicacion, especialidadesValues, imageURLPerfil,
        imageURLHeader, horarioApertura, horarioCierre,
        latitud, longitud
      );
      setRestauranteId(restaNew.restaurante_id);
      toastr.success(t('Restaurant added successfully')); // Usar Toastr para mostrar éxito

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
      toastr.error(t("Hubo un error al añadir el restaurante. Por favor, inténtelo de nuevo.")); // Usar Toastr para mostrar error
    }
  };

  // Manejo de errores y éxitos de carga de imágenes
  const handleImageUploadError = (err) => {
    console.error("Error subiendo la imagen:", err);
    toastr.error('Error al subir la imagen. Por favor, inténtelo de nuevo.'); // Usar Toastr para mostrar error
  };

  const handleImageUploadSuccessPerfil = (res) => {
    setImageURLPerfil(res.url);
    toastr.success(t('Profile image uploaded successfully')); // Usar Toastr para mostrar éxito al subir imagen de perfil
  };

  const handleImageUploadSuccessHeader = (res) => {
    setImageURLHeader(res.url);
    toastr.success(t('Header image uploaded successfully')); // Usar Toastr para mostrar éxito al subir imagen de cabecera
  };

  return (
    <div className="form-admin">
      <div className='Datos'>
        {/* Campos para ingresar datos del restaurante */}
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
            <option key={canton.id_canton} value={canton.id_canton}>
              {canton.nombre}
            </option>
          ))}
        </select>
        <br />
        <label>{t('Distritos')}:</label>
        <select onChange={CambiosDistritos}>
          <option value="">Seleccione un distrito</option>
          {distritos.map(distrito => (
            <option key={distrito.id_distrito} value={distrito.id_distrito}>
              {distrito.nombre}
            </option>
          ))}
        </select>
        <br />
        <label>{t('Horario de apertura')}:</label>
        <input
          type="time"
          value={horarioApertura}
          onChange={e => setHorarioApertura(e.target.value)}
        />
        <br />
        <label>{t('Horario de cierre')}:</label>
        <input
          type="time"
          value={horarioCierre}
          onChange={e => setHorarioCierre(e.target.value)}
        />
        <br />
        <label>{t('Ubicación')}:</label>
        <input
          type="text"
          placeholder={t('Ubicación')}
          value={latitud}
          onChange={e => setLatitud(e.target.value)}
        />
        <input
          type="text"
          placeholder={t('Ubicación')}
          value={longitud}
          onChange={e => setLongitud(e.target.value)}
        />
        <br />
        {/* Botón para añadir restaurante */}
        <button onClick={Añadir}>{t('Añadir Restaurante')}</button>
      </div>

      {/* Carga de imágenes */}
      <h3>{t('Subir imágenes del restaurante')}</h3>
      <IKContext 
        publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o="
        urlEndpoint="https://ik.imagekit.io/sox1oxatj/restaurapp/"
        authenticator={authenticator}
      >
        <div>
          <p>{t('Subir imagen de perfil')}</p>
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessPerfil}
          />
        </div>
        <div>
          <p>{t('Subir imagen de cabecera')}</p>
          <IKUpload
            onError={handleImageUploadError}
            onSuccess={handleImageUploadSuccessHeader}
          />
        </div>
      </IKContext>

      {/* Componente para subir el menú del restaurante */}
      <FileUploaderMenu restauranteId={restauranteId} />
    </div>
  );
};

export default FormAdmin;

