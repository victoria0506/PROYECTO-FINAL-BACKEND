import { useEffect, useRef } from 'react';

const Intro = () => {
  const introRef = useRef(null);
  const logoSpansRef = useRef([]);

  useEffect(() => {
    const logoSpans = logoSpansRef.current;

    setTimeout(() => {
      logoSpans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (index + 1) * 100);
      });

      setTimeout(() => {
        logoSpans.forEach((span) => {
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (logoSpans.indexOf(span) + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        introRef.current.style.top = '-100vh';
      }, 1000);
    }, 0); // Asegúrate de que las animaciones comiencen después de que el componente esté montado
  }, []);

  return (
    <div className="intro" ref={introRef}>
      <img className='logointro' src="src/img/logonav.png" alt="clarkode logo" />
    </div>
  );
};

export default Intro;