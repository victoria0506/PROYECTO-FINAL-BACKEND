// src/components/Nav.js
import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useTranslation } from 'react-i18next';

function Nav() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="logonav" src="src/img/logonav.png" alt="Logo" />
      </div>
      <div className="menu">
        <a href="/" className="menu-item">{t('home')}</a>
        <a href="/descubre" className="menu-item">{t('discover')}</a>
        <a href="/about" className="menu-item">{t('about us')}</a>
        <a href="/contacto" className="menu-item">{t('contact')}</a>
      </div>
      <div className="search-bar">
        <input
          type="search"
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="search-input"
        />
        <button className="btnbuscar" onClick={handleSearch}>{t('search')}</button>
      </div>
      <div className="actions">
        <ToggleSwitch />
      </div>
    </nav>
  );
}

export default Nav;

