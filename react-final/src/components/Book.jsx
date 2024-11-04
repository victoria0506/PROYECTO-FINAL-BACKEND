
import HTMLFlipBook from 'react-pageflip';
import '../style/Book.css'

const Book = () => {
  return (
    <div className="flipbook-container">
      <HTMLFlipBook
                width={400}  // Ancho del libro en píxeles
                height={500}  // Altura del libro en píxeles
                size="fixed"  // El tamaño es fijo, pero se adapta en un rango con los minWidth/maxWidth
                minWidth={315}  // Ancho mínimo del libro
                maxWidth={1000}  // Ancho máximo del libro
                minHeight={400}  // Altura mínima del libro
                maxHeight={1533}  // Altura máxima del libro
                maxShadowOpacity={0.5}  // Opacidad máxima de la sombra en las páginas al pasarlas
                showCover={true}  // Indica que se debe mostrar una portada del libro
                mobileScrollSupport={true}  // Soporte de scroll para móviles
                drawShadow={true}  // Habilita la sombra alrededor de las páginas
                useMouseEvents={true}  // Permite pasar páginas con el mouse
                autoSize={true}  // Ajusta automáticamente el tamaño del libro a la pantalla
                clickEventForward={true}  // Pasa la página al hacer clic en ella
                flippingTime={2000}  // Tiempo que tarda en pasar una página (2000 ms = 2 segundos)
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


