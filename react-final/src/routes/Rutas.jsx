import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import HomePage from '../pages/HomePage';
 
function Rutas() {
    return (
      <div>
          <Router>
              <Routes>
                       <Route path='/home' element={< HomePage/>}   />
                       <Route path='/register' element={< Registro/>}   />
                       <Route path='/login' element={<Login/>}   />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas
