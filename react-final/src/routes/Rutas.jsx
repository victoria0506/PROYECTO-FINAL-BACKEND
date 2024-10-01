import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import HomePage from '../pages/HomePage';
import Admi from "../pages/Admi"
 
function Rutas() {
    return (
      <div>
          <Router>
              <Routes>
                       <Route path='/home' element={< HomePage/>}   />
                       <Route path='/register' element={< Registro/>}   />
                       <Route path='/login' element={<Login/>}   />
                       <Route path='/admi' element={<Admi/>}   />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas
