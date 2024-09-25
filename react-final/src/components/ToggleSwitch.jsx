import { useState } from 'react';

const Nav = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  const handleToggle = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <nav className="navbartoggle">
      <button className="btn">Ayuda</button>
      <a className='btn' href="login">Login</a>
      <div className="toggleContainer">
        <input
          type="checkbox"
          id="language-switch"
          className="language-toggle"
          checked={isEnglish}
          onChange={handleToggle}
        />
        <label htmlFor="language-switch" className="language-switch">
          <span className={`lang-label es ${!isEnglish ? 'active' : ''}`}>ES</span>
          <span className={`lang-label en ${isEnglish ? 'active' : ''}`}>EN</span>
        </label>
      </div>
    </nav>
  );
};

export default Nav;