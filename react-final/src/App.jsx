import './App.css';
import Rutas from './routes/Rutas';
import Nav from './components/Nav';
import Intro from './components/Intro';
import { useState } from 'react';
import Footer from './components/Footer';
function App() {
  const [siInicioSesion, setsiInicioSesion] = useState(false);

  return (
    <>
      <Nav siInicioSesion={siInicioSesion} setsiInicioSesion={setsiInicioSesion} />
      <Rutas siInicioSesion={siInicioSesion} />
      <Intro />
      <Footer />
    </>
  );
}

export default App;

