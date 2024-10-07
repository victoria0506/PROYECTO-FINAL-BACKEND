import { useTranslation } from 'react-i18next';

const ToggleSwitch = () => {
  const { i18n } = useTranslation();
  const handleToggle = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="toggleContainer">
      <button className="btn">{i18n.t('help')}</button>
      <a className='btnlogin' href="login">{i18n.t('login')}</a>
    
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
