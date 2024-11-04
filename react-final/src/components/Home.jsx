import '../style/home.css'
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <img className="background-video" src="src/img/Pure.jpg" alt="" />
      <div className="imglogohomecenter">
        <img className="imglogohome" src="src/img/file.png" alt="" />
      </div>
      <p className="parrafohome">
        {t('Would you like to discover new restaurants?')} <br />
        {t('Explore different options and choose the one you like the most.')} <br />
        <em>{t('Enjoy the search!')}</em>
      </p>
      <img className="solhome" src="src/img/solhome.png" alt="" />

    </div>
    
  );
};

export default Home;
