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
    
      <img className="solhome" src="src/img/solhome.png" alt="" />

    </div>
  );
};

export default Home;
