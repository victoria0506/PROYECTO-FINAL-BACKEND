import './App.css';
import Rutas from './routes/Rutas';
import Nav from './components/Nav';
import Intro from './components/Intro';
//import { useState } from 'react';
import Footer from './components/Footer';
function App() {

  return (
    <>
      <Nav/>
      <Rutas />
      <Intro />
      <Footer />
    </>
  );
}

export default App;

