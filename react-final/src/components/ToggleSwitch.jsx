import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../style/toggle.css";
import { compartirContexto } from '../context/contextProvider';
import { useEffect, useState } from 'react';

const ToggleSwitch = () => {
  const { i18n } = useTranslation();
  const [usuario, setUsuario] = useState(null);
  const [admi, setAdmi] = useState(null);
  const { actualizador, setActu } = compartirContexto();
  const [fotoPerfil, setFotoPerfil] = useState(null); 

  useEffect(() => {
    const id = localStorage.getItem("Usuario Autenticado_id")
    const adminId = localStorage.getItem("Admi-id")
    const storedLang = localStorage.getItem('language')

    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
    if (id !== usuario) {
      setUsuario(id);
      const foto = localStorage.getItem(`fotoPerfil_${id}`);
      setFotoPerfil(foto); 
    }
    if (adminId !== admi) {
      setAdmi(adminId);
    }
  }, [usuario, admi]);

  useEffect(() => {
    setActu(actualizador + 1);
  }, [setActu]);

  const handleToggle = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang)
  };

  return (
    <div className="toggleContainer">
      {usuario ? (
        <div className="user-container">
          <a className='btnlogincuenta' href={`/Perfilusuario/${usuario}`}>
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Foto de perfil" className="foto-cuenta" /> // Mostrar la foto de perfil si existe
            ) : (
              <FontAwesomeIcon icon={faUser} className="icono-usuario" /> // Mostrar el ícono de usuario si no hay foto
            )}
          </a>
        </div>
      ) : (
        <a className='btnlogin' href="/login">{i18n.t('login')}</a>
      )}

      <input
        type="checkbox"
        id="language-switch"
        className="language-toggle"
        onChange={handleToggle} 
        checked={i18n.language === 'en'}
      />
      <label htmlFor="language-switch" className="language-switch">
        <span className={`lang-label es ${i18n.language === 'es' ? 'active' : ''}`}>ES</span>
        <span className={`lang-label en ${i18n.language === 'en' ? 'active' : ''}`}>EN</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
