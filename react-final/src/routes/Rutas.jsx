import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import HomePage from '../pages/HomePage';
import Admi from "../pages/Admi"
import ContactoPage from '../pages/ContactoPage';
import AboutPage from '../pages/AboutPage';
import PrivateRoute from './routePrivate';

import DescubrePage from '../pages/DescubrePage';
import Usuarios from "../pages/Usuarios";
import Restaurantes from "../pages/Restaurantes"

function Rutas() {
    return (
      <div>
          <Router>
            {/* <ToggleSwitch/> */}
              <Routes>
                      <Route path='/home' element={< HomePage/>}   />
                      <Route path='/about' element={< AboutPage/>}   />
                      <Route path='/descubre' element={< DescubrePage/>}   />
                      <Route path='/contacto' element={< ContactoPage/>}   />
                      <Route path='/register' element={< Registro/>}   />
                      <Route path='/login' element={<Login/>}   />
                      <Route path='/admi' 
                      element={
                         <PrivateRoute>
                            <Admi/>
                         </PrivateRoute>
                      }/>
                      <Route path='/Restaurant/:restaurante_id' element={<Restaurantes/>}   />
                      <Route path='/Perfilusuario/:usuario_id' element={ <Usuarios/>} />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas