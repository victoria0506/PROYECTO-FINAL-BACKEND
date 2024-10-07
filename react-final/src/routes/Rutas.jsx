import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import HomePage from '../pages/HomePage';
import Admi from "../pages/Admi"
import ContactoPage from '../pages/ContactoPage';
import AboutPage from '../pages/AboutPage';
import CardLasBrisas from '../pages/CardLasBrisas';

function Rutas() {
    return (
      <div>
          <Router>
              <Routes>
                       <Route path='/home' element={< HomePage/>}   />
                       <Route path='/about' element={< AboutPage/>}   />
                       <Route path='/contacto' element={< ContactoPage/>}   />
                       <Route path='/register' element={< Registro/>}   />
                       <Route path='/login' element={<Login/>}   />
                       <Route path='/admi' element={<Admi/>}  />
                       <Route path='/lasbrisas' element={<CardLasBrisas/>}   />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas