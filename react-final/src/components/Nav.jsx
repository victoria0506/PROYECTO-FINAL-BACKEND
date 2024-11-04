import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../style/nav.css';
import ToggleSwitch from './ToggleSwitch';
import { useTranslation } from 'react-i18next';
import BusquedaRes from './BusquedaRes';

function Nav() {
  const { t } = useTranslation();


  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img className="logonav" src="/src/img/logonav.png" alt="Logo" />
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu">
            <li className="nav-item">
              <a className="nav-link menu-item" href="/home">{t('home')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="/descubre">{t('discover')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="/about">{t('About Us')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="/contacto">{t('contact')}</a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <BusquedaRes />
            <div className="actions ms-3">
              <ToggleSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;


