import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../style/toggle.css";
import { compartirContexto } from '../context/contextProvider';
import { useEffect, useState } from 'react';

const ToggleSwitch = () => {
  // Hook para la traducción
  const { i18n } = useTranslation();

  // Estado para almacenar el ID del usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // Estado para almacenar el ID del administrador
  const [admi, setAdmi] = useState(null);

  // Contexto compartido para el actualizador
  const { actualizador, setActu } = compartirContexto();

  // Estado para almacenar la foto de perfil del usuario
  const [fotoPerfil, setFotoPerfil] = useState(null); 

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const id = localStorage.getItem("Usuario Autenticado_id");
    const adminId = localStorage.getItem("Admi-id");
    const storedLang = localStorage.getItem('language');

    // Cambia el idioma almacenado si existe
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }

    // Establece el ID del usuario si ha cambiado
    if (id !== usuario){
      setUsuario(id);
      const foto = localStorage.getItem(`fotoPerfil_${id}`);
      setFotoPerfil(foto); // Establece la foto de perfil del usuario
    }

    // Establece el ID del administrador si ha cambiado
    if (adminId !== admi) {
      setAdmi(adminId);
    }
  }, [usuario, admi]);

  // Efecto para incrementar el actualizador cada vez que se monta el componente
  useEffect(() => {
    setActu(actualizador + 1);
  }, [setActu]);

  // Maneja el cambio de idioma
  const handleToggle = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'; // Cambia entre español e inglés
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang); // Almacena el nuevo idioma en localStorage
  };

  // Función para cerrar sesión del administrador
  const cerra_admi = () => {
    localStorage.removeItem("Admi-id"); // Elimina el ID del administrador de localStorage
    setActu(actualizador + 1); // Actualiza el estado
    setTimeout(() => {
      navigate("/login"); // Redirige a la página de login después de un tiempo
    }, 1000);
  }

  return (
    <div className="toggleContainer">
      {usuario ? (
        <div className="user-container">
          <a className="btnlogincuenta" href={`/Perfilusuario/${usuario}`}>
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Foto de perfil" className="foto-cuenta" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="icono-usuario" />
            )}
          </a>
        </div>
      ) : admi ? ( // Si hay un administrador autenticado
        <div className="admin-container">
          <a className="btnlogincuenta" href="/admi">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Foto de perfil" className="foto-cuenta" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="icono-usuario" />
            )}
          </a>
          <button className="btn-cerrar-sesion" onClick={cerra_admi}>
            {i18n.t('logout')} // Texto del botón de cerrar sesión en el idioma actual
          </button>
        </div>
      ) : (
        <a className="btnlogin" href="/login">{i18n.t('login')}</a> // Si no hay usuario ni administrador, muestra el botón de login
      )}
      <input
        type="checkbox"
        id="language-switch"
        className="language-toggle"
        onChange={handleToggle} 
        checked={i18n.language === 'en'} // Marca el toggle si el idioma es inglés
      />
      <label htmlFor="language-switch" className="language-switch">
        <span className={`lang-label es ${i18n.language === 'es' ? 'active' : ''}`}>ES</span>
        <span className={`lang-label en ${i18n.language === 'en' ? 'active' : ''}`}>EN</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;

