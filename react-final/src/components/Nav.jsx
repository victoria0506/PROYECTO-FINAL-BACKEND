import { useState, useEffect } from 'react';
import '../style/nav.css';
import ToggleSwitch from './ToggleSwitch';
import { useTranslation } from 'react-i18next';
import BusquedaRes from './BusquedaRes';

function Nav() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhitePage, setIsWhitePage] = useState(false); // Nuevo estado para fondo de página

  // Detectar si la página tiene fondo blanco desde el inicio
  useEffect(() => {
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
    if (backgroundColor === 'rgb(255, 255, 255)') {
      setIsWhitePage(true);
    }
  }, []);

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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isWhitePage ? 'white-page' : ''}`}>
      <div className="navbar-brand">
        <img className="logonav" src="/src/img/logonav.png" alt="Logo" />
      </div>
      <div className="menu">
        <a href="/home" className="menu-item">{t('home')}</a>
        <a href="/descubre" className="menu-item">{t('discover')}</a>
        <a href="/about" className="menu-item">{t('About Us')}</a>
        <a href="/contacto" className="menu-item">{t('contact')}</a>
      </div>
        <BusquedaRes />
      <div className="actions">
        <ToggleSwitch />
      </div>
    </nav>
  );
}

export default Nav;