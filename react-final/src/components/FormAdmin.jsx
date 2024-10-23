import { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css";
import Select from 'react-select';
import UsedataRest from './UsedataRest';
import { IKContext, IKUpload } from 'imagekitio-react';

const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const { t } = useTranslation();
  const { distritos, cantones, especialidades } = UsedataRest(ubicacion.canton);

  const CambiosDistritos = (e) => {
    console.log("estan ocurriendo cambios");
    setUbicacion({ ...ubicacion, distrito: e.target.value });
  };

  const CambiosCantones = (e) => {
    console.log("estan ocurriendo cambios");
    setUbicacion({ canton: e.target.value, distrito: "" });
  };

  const CambiosEspecialidades = (e) => {
    const valor = Array.from(e.target.selectedOptions, Option => Option.value);
    setEspeciSelect(valor);
  };

  const Añadir = async () => {
    if (nomResta.trim() === "" || precioPro.trim() === "" || capacidad.trim() === "" || descripcion.trim() === "" || !ubicacion.canton || !ubicacion.distrito || imageURL.trim() === "") {
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'Ingrese sus datos de manera correcta',
      });
    } else {
      const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
      await PostResta(nomResta, precioPro, capacidad, descripcion, ubicacion, especialidadesValues, imageURL);
      setSwalProps({
        show: true,
        title: 'Éxito!',
        text: 'Restaurante añadido exitosamente',
      });
    }
  };

  const handleImageUploadError = (err) => {
    console.log("Error subiendo la imagen:", err);
  };

  const handleImageUploadSuccess = (res) => {
    setImageURL(res.url); // Guardar la URL de la imagen subida
    console.log("Imagen subida exitosamente:", res.url);
  };

  const authenticator = async () => {
    try {
      const response = await fetch('https://ik.imagekit.io/sox1oxatj/restaurapp');
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
      <div>
        <div className='Datos'>
          <label>{t('Restaurant name')} : </label>
          <input type="text" placeholder={t('Restaurant')}
            value={nomResta}
            onChange={e => setNomresta(e.target.value)} />
          <br />

          <label>{t('Average price')}: </label>
          <input type="text"
            placeholder={t('Average price')}
            value={precioPro}
            onChange={e => setPrecioPro(e.target.value)} />

          <label htmlFor="">{t('Ability')}</label>
          <input type="text"
            placeholder={t('Ability')}
            value={capacidad}
            onChange={e => setCapacidad(e.target.value)} />
          <br />

          <label htmlFor="">{t('description')}</label>
          <input type="text"
            placeholder={t('description')}
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)} />
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
  
          {/* Sección de ImageKit */}
          <IKContext
            publicKey="public_0YV+YM5fadPtV/mPsMsRyJNcT6o="
            urlEndpoint="https://ik.imagekit.io/sox1oxatj"
            authenticator={authenticator}
          >
            <IKUpload
              fileName="my-upload"
              onError={handleImageUploadError}
              onSuccess={handleImageUploadSuccess}
              className="form-control inputField"
            />
          </IKContext>

          <button className='buttonaddadmi' onClick={Añadir}>{t('Add')}</button>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </div>
  );
}

export default FormAdmin;


