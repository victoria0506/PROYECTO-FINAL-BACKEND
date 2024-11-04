
import '../style/about.css';  // Asegúrate de tener un archivo CSS vinculado

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Sobre RestaurApp</h1>
        <p>
          RestaurApp nació con el objetivo de conectar a las personas con la increíble diversidad de restaurantes en Puntarenas. Queremos que tanto residentes como turistas disfruten de la oferta gastronómica de la región, desde pequeños locales familiares hasta reconocidos restaurantes.
        </p>
        <p>
          Nuestra plataforma te permite buscar y descubrir los lugares que mejor se adapten a tus preferencias. ¡Apoyemos juntos a la comunidad gastronómica mientras disfrutamos de lo mejor que tiene para ofrecer!
        </p>
        <p>
          Únete a nosotros y explora los sabores únicos que solo Puntarenas puede ofrecer. ¡Tu próxima experiencia culinaria está a un clic de distancia!
        </p>
      </div>
      <div className="about-image">
        <img src="/src/img/solhome.png" alt="Diversidad gastronómica de Puntarenas" />
      </div>
    </div>
  );
}

export default About;

