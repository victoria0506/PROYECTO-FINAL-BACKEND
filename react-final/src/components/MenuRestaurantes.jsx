import HTMLFlipBook from 'react-pageflip';
import '../style/Book.css'

function MenuRestaurantes() {
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
        {/* Página de portada con el logo del restaurante */}
        <div className="page cover">
          <img src='src/img/logonav.png' alt="Restaurante de Mariscos Logo" className="logo" />
          <h1>Hotel Las Brisas</h1>
          <p>Menú</p>
        </div>

        {/* Página 1: Entradas */}
        <div className="page">
          <h1>Entradas</h1>
          <ul>
            <li><strong>Ceviche Mixto:</strong> Pescado fresco y mariscos con limón, cebolla y cilantro. - $12.00</li>
            <li><strong>Coctel de Camarones:</strong> Camarones frescos servidos con salsa cóctel. - $10.00</li>
            <li><strong>Ostiones al Natural:</strong> Ostiones servidos con limón y salsa picante. - $15.00</li>
            <li><strong>Empanadas de Mariscos:</strong> Masa crujiente rellena de mariscos frescos. - $8.00</li>
          </ul>
        </div>

        {/* Página 2: Platos Principales */}
        <div className="page">
          <h1>Platos Principales</h1>
          <ul>
            <li><strong>Pulpo a la Parrilla:</strong> Pulpo tierno a la parrilla servido con ensalada de rúcula y papas. - $18.00</li>
            <li><strong>Langosta Termidor:</strong> Langosta al horno gratinada con salsa de queso. - $25.00</li>
            <li><strong>Filete de Pescado:</strong> Filete de pescado del día con salsa de ajo y perejil. - $20.00</li>
            <li><strong>Paella de Mariscos:</strong> Arroz con azafrán, mejillones, almejas, camarones y calamares. - $22.00</li>
          </ul>
        </div>

        {/* Página 3: Bebidas */}
        <div className="page">
          <h1>Bebidas</h1>
          <ul>
            <li><strong>Margarita de Mango:</strong> Refrescante margarita con un toque de mango. - $8.00</li>
            <li><strong>Mojito:</strong> Clásico mojito con ron, menta y lima. - $7.00</li>
            <li><strong>Agua de Coco:</strong> Agua fresca servida directamente del coco. - $4.00</li>
            <li><strong>Limonada con Hierbabuena:</strong> Limonada fresca con un toque de hierbabuena. - $5.00</li>
          </ul>
        </div>

        {/* Página 4: Postres */}
        <div className="page">
          <h1>Postres</h1>
          <ul>
            <li><strong>Helado de Coco:</strong> Cremoso helado de coco con trozos de fruta tropical. - $6.00</li>
            <li><strong>Flan de Maracuyá:</strong> Flan casero con sabor a maracuyá. - $5.00</li>
            <li><strong>Tarta de Limón:</strong> Tarta de limón con merengue crujiente. - $6.00</li>
            <li><strong>Crema Catalana:</strong> Postre tradicional con azúcar caramelizada. - $7.00</li>
          </ul>
        </div>

      </HTMLFlipBook>
    </div>
  );
}

export default MenuRestaurantes;

