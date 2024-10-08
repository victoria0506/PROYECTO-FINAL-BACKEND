import { useState, useEffect } from 'react';
import '../style/nav.css'
import ToggleSwitch from './ToggleSwitch';
import { useTranslation } from 'react-i18next';

function Nav() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  /*const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`Searching for: ${searchQuery}`);
    }
  };*/

  // Detectar scroll para cambiar el color del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <img className="logonav" src="src/img/logonav.png" alt="Logo" />
      </div>
      <div className="menu">
        <a href="/home" className="menu-item">{t('home')}</a>
        <a href="/descubre" className="menu-item">{t('discover')}</a>
        <a href="/about" className="menu-item">{t('About Us')}</a>
        <a href="/contacto" className="menu-item">{t('contact')}</a>
      </div>
      <div className="search-bar">
        <input
          type="search"
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          /*onKeyDown={handleSearch}*/
          className="search-input"
        />
      </div>
      <div className="actions">
        <ToggleSwitch />
      </div>
    </nav>
  );
}

export default Nav;


