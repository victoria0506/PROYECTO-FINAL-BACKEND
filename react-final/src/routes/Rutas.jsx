import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

import Login from '../pages/Login'
import Registro from "../pages/Registro" 
import Home from "../components/Home"

function Rutas() {
    return (
      <div>
          <Router>
              <Routes>
                       <Route path='/' element={< Home/>}   />
                       <Route path='/register' element={< Registro/>}   />
                       <Route path='/login' element={<Login/>}   />
              </Routes>
          </Router>
      </div>
    )
  
  }
  
  export default Rutas
