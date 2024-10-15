import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../style/toggle.css"
import { compartirContexto } from '../context/contextProvider';
import { useEffect, useState } from 'react';

const ToggleSwitch = () => {
  const { i18n } = useTranslation();
  // console.log("id usuario : ", usuario_id);
  const [usuario, setUsuario] = useState(null);
  const [admi, setAdmi] = useState(null);
  const {actualizador, setActu, apiData, setApiData} = compartirContexto()
  
  useEffect(() => {
    const id = localStorage.getItem("Usuario Autenticado_id");
    const adminId = localStorage.getItem("Admi-id");
    if (id !== usuario) {
      setUsuario(id);
    }
    if (adminId !== admi) {
      setAdmi(adminId);
    }
  }, [usuario, admi])

  // useEffect(() => {
  //   setActu(actualizador + 1);
  // }, [actualizador, setActu]);
   
  const handleToggle = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="toggleContainer">
      <button className="btn">{i18n.t('help')}</button>
      {usuario ? (
        <div className="user-container">
          <a className='btnlogincuenta' href={`/Perfilusuario/${usuario}`}>
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>
      ) : (
        <a className='btnlogin' href="login">{i18n.t('login')}</a>
      )}

      <input
        type="checkbox"
        id="language-switch"
        className="language-toggle"
        onChange={handleToggle} // Llama a la función para cambiar idioma
      />
      <label htmlFor="language-switch" className="language-switch">
        <span className={`lang-label es ${i18n.language === 'es' ? 'active' : ''}`}>ES</span>
        <span className={`lang-label en ${i18n.language === 'en' ? 'active' : ''}`}>EN</span>
      </label>
    </div>
  );
};
export default ToggleSwitch;
