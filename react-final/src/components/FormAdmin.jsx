import React from 'react'
import { useState } from 'react'
import SweetAlert2 from 'react-sweetalert2';
import PostResta from '../services/postResta';
import { useTranslation } from 'react-i18next';
import "../style/admi.css"
import Select from 'react-select';
import UsedataRest from './UsedataRest';

const FormAdmin = () => {
  const [nomResta, setNomresta] = useState("");
  const [precioPro, setPrecioPro] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [calificacion, setCalificacio] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
  const [especiSelect, setEspeciSelect] = useState([]);
  const { t } = useTranslation();

  const {distritos, cantones, especialidades} = UsedataRest(ubicacion.canton)
  
  const CambiosDistritos = (e) => {
    console.log("estan ocurriendo cambios");
    setUbicacion({ ...ubicacion, distrito: e.target.value })
  }

  const CambiosCantones = (e) => {
    console.log("estan ocurriendo cambios");
    setUbicacion({canton: e.target.value, distrito: "" })
  }

  const CambiosEspecialidades = (e) => {
    console.log("estan ocurriendo cambios");
    const valor = Array.from(e.target.selectedOptions, Option => Option.value)
    setEspeciSelect(valor) 
    console.log(valor);
  } 

    const Añadir = async () =>{
        if (nomResta.trim() === "" || precioPro.trim() === "" || capacidad.trim() === "" || !ubicacion.canton || !ubicacion.distrito) {
            setSwalProps({ 
              show: true,
              title: 'Error',
              text: 'Ingrese sus datos de manera correcta',
            });
        }else{
          const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
           await PostResta(nomResta, precioPro,capacidad, calificacion, ubicacion, especialidadesValues);
           console.log(especiSelect);
           setSwalProps({ 
            show: true,
            title: 'Exito!',
            text: 'Restaurante añadido exitosamente',
          });
        }
    }

  return (
    <div>
      <div>
        <div className='Datos'>
          <label>{t('Restaurant name')} : </label>
          <input type="text" placeholder={t('Restaurant')}
          value={nomResta} 
          onChange={e => setNomresta(e.target.value)}/>
          <br />

          <label>{t('Average price')}: </label>
          <input type="text" 
          placeholder={t('Average price')}
          value={precioPro}
          onChange={e => setPrecioPro(e.target.value)}/>

          <label htmlFor="">{t('Qualification')}</label>
          <input type="text" 
          placeholder={t('Qualification')}
          value={calificacion} 
          onChange={e => setCalificacio(e.target.value)}/>
          <br />

          <label htmlFor="">{t('Ability')}</label>
          <input type="text" 
          placeholder={t('Ability')}
          value={capacidad} 
          onChange={e => setCapacidad(e.target.value)}/>
          <br />

          <label>{t('Specialty')}:</label>
          <Select
            onChange={setEspeciSelect}
            isMulti
            isSearchable
            options={especialidades.map(especialidad => ({
              label: especialidad.descripcion,
              value: especialidad.id_especialidad}))}
            className="basic"
          />
          <br />

          <label htmlFor="">Cantones :  </label>
          <select name="" id="" onChange={CambiosCantones}>
           <option value="">Seleccione un canton</option>
            {cantones.map(canton => (
              <option key={canton.id_canton} value={canton.id_canton}>{canton.nombre_canton}</option>
            ))}
          </select>

          <label htmlFor="">Distrito:  </label>
          <select name="" id="" onChange={CambiosDistritos}>
           <option value="">Seleccione un distrito</option>
            {distritos.map(distrito => (
              <option key={distrito.id_distrito} value={distrito.id_distrito}>{distrito.nombre_distrito}</option>
            ))}
          </select>

          <br /><br />
          <button onClick={Añadir}>{t('Add')}</button>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </div>
  )
}

export default FormAdmin
