
import HTMLFlipBook from 'react-pageflip';
import '../style/Book.css'


const Book = () => {
  return (
    <div className="flipbook-container">
      <HTMLFlipBook
        width={400}
        height={500}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        useMouseEvents={true}
        autoSize={true}
        clickEventForward={true}
        flippingTime={2000}
        className="flipbook"
      >
        {/* Página de portada con el logo */}
        <div className="page cover">
          <img src='src/img/logonav.png' alt="RestaurApp Logo" className="logo" />
        </div>

        {/* Página 1 y 2: Acerca de RestaurApp */}
        <div className="page">
          <h1>Acerca de RestaurApp</h1>
          <p>
            En RestaurApp, nuestra misión es hacer que la búsqueda de un restaurante sea tan deliciosa como la comida misma.
            Sabemos que encontrar el lugar perfecto para comer puede ser un desafío, ya sea que estés buscando algo cerca de ti,
            un restaurante dentro de tu presupuesto, o un lugar con tu tipo de comida favorita.
          </p>
        </div>
        <div className="page">
          <h1>¿Qué es RestaurApp?</h1>
          <p>
            RestaurApp es una plataforma innovadora que centraliza toda la información que necesitas en un solo lugar.
            Nuestro objetivo es ofrecerte una experiencia de búsqueda fácil, rápida y eficiente.
          </p>
        </div>

        {/* Página 3 y 4: Qué nos diferencia */}
        <div className="page">
          <h1>¿Qué nos diferencia?</h1>
          <ul>
            <li><strong>Ubicación:</strong> Encuentra restaurantes cerca de ti o en cualquier parte del mundo.</li>
            <li><strong>Presupuesto:</strong> Busca opciones que se adapten a lo que estás dispuesto a gastar.</li>
            <li><strong>Preferencias Culinarias:</strong> Desde cocina local hasta internacional.</li>
            <li><strong>Disponibilidad:</strong> Filtra por horarios y días de alta demanda.</li>
          </ul>
        </div>
        <div className="page">
          <h1>Nuestra Visión</h1>
          <p>
            Queremos ser la plataforma de referencia cuando se trata de buscar restaurantes. Continuamente mejoramos
            nuestras funcionalidades para ofrecerte más opciones, como reseñas de otros usuarios, reservas, y un sistema
            de calificaciones basado en criterios que realmente importan.
          </p>
        </div>

        {/* Página 5 y 6: Nuestro Compromiso */}
        <div className="page">
          <h1>Nuestro Compromiso</h1>
          <p>
            Nos importa que tengas la mejor experiencia posible al utilizar nuestra aplicación. Trabajamos en base a tres principios clave:
            Facilidad de uso, Confianza, e Innovación constante.
          </p>
        </div>
      </HTMLFlipBook>
    
    </div>
  );
};

export default Book;


