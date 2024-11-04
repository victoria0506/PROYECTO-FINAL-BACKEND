import '../style/about.css';  // Asegúrate de tener un archivo CSS vinculado
import { useTranslation } from 'react-i18next';













function About() {
  const { t } = useTranslation()

  return (
    <div className="about-container">
      <div className="about-content">
        <h1>{t('About RestaurApp')}</h1>
        <p>
          {t('RestaurApp was born with the goal of connecting people with the incredible diversity of restaurants in Puntarenas. We want both residents and tourists to enjoy the culinary offerings of the region, from small family-run establishments to well-known restaurants.')}
        </p>
        <p>
          {t('Our platform allows you to search and discover the places that best fit your preferences. Let’s support the culinary community together while enjoying the best it has to offer!')}
        </p>
        <p>
          {t('Join us and explore the unique flavors that only Puntarenas can offer. Your next culinary experience is just a click away!')}
        </p>
      </div>
      <div className="about-image">
        <img src="/src/img/solhome.png" alt="Diversidad gastronómica de Puntarenas" />
      </div>
    </div>
  );
}

export default About;