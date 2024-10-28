import HTMLFlipBook from 'react-pageflip';
import '../style/menurestaurante.css';

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
        showCover={true}  // Mostrar una portada del libro
        mobileScrollSupport={true}  // Soporte de scroll para móviles
        drawShadow={true}  // Habilita la sombra alrededor de las páginas
        useMouseEvents={true}  // Permite pasar páginas con el mouse
        autoSize={true}  // Ajusta automáticamente el tamaño del libro a la pantalla
        clickEventForward={true}  // Pasa la página al hacer clic en ella
        flippingTime={2000}  // Tiempo para pasar una página (en milisegundos)
        className="flipbook"
      >
        {/* Portada */}
        <div className="page cover">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2Fz7odg9398a.webp?alt=media&token=e4a5a77f-f394-4daa-8d5d-78707b941fdc' alt="Portada del Restaurante" className="cover-image" />
        </div>

        {/* Página 1: Entradas */}
        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2F66b5h82lmpx.webp?alt=media&token=5d1c77d2-cbd0-46c9-94ef-ece1bcab54df' alt="Entradas" className="page-image" />
        </div>

        {/* Página 2: Platos Principales */}
        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2Ftextokk9oer.webp?alt=media&token=74022e44-259f-4dc4-948c-ca6d9328c5b1' alt="Platos Principales" className="page-image" />
        </div>

        {/* Página 3: Bebidas */}
        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2Fw99tw24zxe.webp?alt=media&token=17f52908-6d21-4d96-a688-2d1738621a3a' alt="Bebidas" className="page-image" />
        </div>

        {/* Página 4: Postres */}
        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2Fx5m241i819.webp?alt=media&token=24262d94-c4f5-4b4c-99f8-30f87dd7013c' alt="Postres" className="page-image" />
        </div>

        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2F67y1h0gfp25.webp?alt=media&token=7cfa1849-0dc2-40bb-ae28-1dab45c8a935' alt="Postres" className="page-image" />
        </div>

        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2F9ygq18jaw3.webp?alt=media&token=8999523c-6ba2-4504-9240-1bf5d11a2052' alt="Postres" className="page-image" />
        </div>

        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2F1ft426vc4ec.webp?alt=media&token=d332c6da-b222-450a-b181-1cddfb9c81a2' alt="Postres" className="page-image" />
        </div>

        <div className="page">
          <img src='https://firebasestorage.googleapis.com/v0/b/mareaalcalina-f1545.appspot.com/o/Marea-Alcalina-Images%2FsKMl3XbzU0PHwyZ244k5718hKpc2%2FI6X57GAQfrNZyXiNJKGQ%2Fq5eph3m19j.webp?alt=media&token=4ff09777-a955-4ef4-af85-5a234b6e1c47' alt="Postres" className="page-image" />
        </div>

      </HTMLFlipBook>
    </div>
  );
}

export default MenuRestaurantes;


