import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import HomePage from '../pages/HomePage';
import Admi from "../pages/Admi"
import ContactoPage from '../pages/ContactoPage';
import AboutPage from '../pages/AboutPage';
import RestaurantsDetail from '../components/RestaurantsDetail';
import PrivateRoute from './routePrivate';
import PerfilUsuario from '../components/PerfilUsuario';
import ToggleSwitch from "../components/ToggleSwitch";
import DescubrePage from '../pages/DescubrePage';

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
                      <Route path='/Restaurant/:restaurante_id' element={<RestaurantsDetail/>}   />
                      <Route path='/Perfilusuario/:usuario_id' element={ <PerfilUsuario/>} />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas