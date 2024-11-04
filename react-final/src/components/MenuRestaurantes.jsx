import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../style/menurestaurante.css';
import menuGet from '../services/menuGet';

function MenuRestaurantes({ restauranteId }) {
  const [menuImages, setMenuImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuImages = async () => {
      setLoading(true);
      try {
        const images = await menuGet(restauranteId);
        if (images) {
          setMenuImages(images);
        } else {
          setError("No se encontraron imágenes del menú.");
        }
      } catch (error) {
        setError("Error al cargar las imágenes del menú.");
        console.error("Error al cargar las imágenes del menú:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuImages();
  }, [restauranteId]);

  if (loading) return <p>Cargando imágenes del menú...</p>;
  if (error) return <p>{error}</p>;
  if (!menuImages) return <p>No hay imágenes para mostrar.</p>;

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
        {/* Portada */}
        {menuImages.pagina_1 && (
          <div className="page cover">
            <img src={menuImages.pagina_1} alt="Portada del Restaurante" className="cover-image" />
          </div>
        )}
        {/* Páginas del menú */}
        {[menuImages.pagina_2, menuImages.pagina_3, menuImages.pagina_4, menuImages.pagina_5, menuImages.pagina_6, menuImages.pagina_7].map((image, index) => (
          image && (
            <div className="page" key={index}>
              <img src={image} alt={`Página ${index + 2}`} className="page-image" />
            </div>
          )
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default MenuRestaurantes;


