import React from 'react'
import { useState, useEffect } from 'react'
import SweetAlert2 from 'react-sweetalert2';
import PostResta from '../services/postResta';
import distritos2 from '../services/distritoFech';
import { useTranslation } from 'react-i18next';
import "../style/admi.css"
import canton2 from '../services/cantonFech';

const FormAdmin = () => {
    const [nomResta, setNomresta] = useState("")
    const [precioPro, setPrecioPro] = useState("")
    const [especialidad, setEspecialidad] = useState("")
    const [capacidad, setCapacidad] = useState("")
    const [calificacion, setCalificacio] = useState("")
    const [swalProps, setSwalProps] = useState({})
    const [ubicacion, setUbicacion] = useState({canton: "", distrito: ""})
    const [distritos, setDistritos] = useState([])
    const [cantones, setCantones] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
      const loadDistritos = async () => {
          if (ubicacion.canton) {
              const distritosData = await distritos2(ubicacion.canton); 
              setDistritos(distritosData);
          } else {
              setDistritos([]);
          }
      };
      loadDistritos();
    }, [ubicacion.canton]);

  useEffect(() => {
    const loadCantones = async () => {
            const CantonesData = await canton2();
            setCantones(CantonesData);
    };
    loadCantones();
  }, []);

  const CambiosDistritos = (e) => {
    setUbicacion({ ...ubicacion, distrito: e.target.value })
  }

  const CambiosCantones = (e) => {
    setUbicacion({canton: e.target.value, distrito: "" })
  }

    const Añadir = async () =>{
        if (nomResta.trim() === "" || precioPro.trim() === "" || especialidad.trim() === "" || capacidad.trim() === "" || !ubicacion.canton || !ubicacion.distrito) {
            setSwalProps({ 
              show: true,
              title: 'Error',
              text: 'Ingrese sus datos de manera correcta',
            });
        }else{
           await PostResta(nomResta, precioPro, especialidad, capacidad, calificacion, ubicacion);
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
          <br /><br />
    
          <label>{t('Specialty')}: </label>
          <input type="text" 
          placeholder={t('Specialty')}
          value={especialidad}
          onChange={e => setEspecialidad(e.target.value)}/>
          <br /><br />

          <label>{t('Average price')}: </label>
          <input type="text" 
          placeholder={t('Average price')}
          value={precioPro}
          onChange={e => setPrecioPro(e.target.value)}/>

          <label htmlFor="">{t('Calificacion')}</label>
          <input type="text" 
          placeholder={t('Ability')}
          value={calificacion} 
          onChange={e => setCalificacio(e.target.value)}/>
          <br /><br />

          <label htmlFor="">{t('Ability')}</label>
          <input type="text" 
          placeholder={t('Ability')}
          value={capacidad} 
          onChange={e => setCapacidad(e.target.value)}/>
          <br /><br />

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
