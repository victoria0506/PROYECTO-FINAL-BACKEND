import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

function Nav() {
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
        <a href="/" className="menu-item">Home</a>
        <a href="/descubre" className="menu-item">Descubre</a>
        <a href="/contacto" className="menu-item">Contacto</a>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="search-input"
        />
        <button className="btnbuscar" onClick={handleSearch}>Buscar</button>
      </div>

      <div className="actions">
        <ToggleSwitch/>
      </div>
    </nav>
  );
}

export default Nav;

