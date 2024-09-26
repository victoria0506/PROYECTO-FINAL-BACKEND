
import {useState } from "react"
import { Link } from "react-router-dom"
import userPost from "../service/userPost"
import { useNavigate } from "react-router-dom"
import "../css/registro.css"
import SweetAlert2 from 'react-sweetalert2';
import userGET from "../service/userGET"
function FormRegistro() {
  // declaramos los hooks
    const [usuario, setUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [swalProps, setSwalProps] = useState({});
    const navigate = useNavigate(); // hookpara navegar entre paginas
const mostrar = async ()=>{
    if (usuario.trim("") === "" && contraseña.trim("") === "" && correo.trim("") === "") { // validacion de espacios vacios
        setSwalProps({ // SweetAlert para informar al usuario
          show: true,
          title: 'Error',
          text: 'Ingrese sus datos',
      });
        return
    }
    const UserObte = await userGET() // metdo GET para extraer los usuraios ya registrados
    const validarRegistro = UserObte.find(user => user.correo === correo && user.contrasena === contraseña)// buscamos a las usurios por el correo y la contraseña
    if (validarRegistro) { // si ya esta registrado se envia una alerta para informar al usuraio
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'El correo/contraseña ya se encuentran registrados',
    });
    }else{
    userPost(usuario, correo, contraseña) // si no, se hace el post y se registra correctamente
    setMensaje("Registro exitoso") // se le envia un mensaje de registro exitoso
    setTimeout(() => {
      navigate("/login") // se envia al login despues de un segundo
  }, 1000);
  }
}
  return (
    <div className="login4">
       <div className="logn6">
        <h2>Registro</h2>
       <h5>{mensaje}</h5>
        <label htmlFor="">Usuario : </label>
        <input type="text" className="inRegi" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Nom. Usuario"/>
        <br /><br />
        <label htmlFor="">Correo : </label>
        <input type="text" className="inRegi" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo"/>
        <br /><br />
        <label htmlFor="">contraseña : </label>
        <input type="text" className="inRegi" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Contraseña"/>
        <br /><br />
        <div className="botones">
        <button onClick={mostrar}>Registar Usuario</button>
        <button><Link to='/login'>Ir al login</Link></button>
        </div>
       </div>
       <div>
       <SweetAlert2 {...swalProps} />
       </div>
    </div>
  )
}
export default FormRegistro












































// import {useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import userPost from "../service/userPost"
// import userGET from "../services/userGET"
// import { useNavigate } from "react-router-dom"
// import "../css/registro.css"
// // import SweetAlert2 from 'react-sweetalert2';
// // import userGET from "../service/getUser"
// function RegistroForm() {
//   // declaramos los hooks
//     const [usuario, setUsuario] = useState("")
//     const [correo, setCorreo] = useState("")
//     const [contraseña, setContraseña] = useState("")
//     const [mensaje, setMensaje] = useState("")
//     const [swalProps, setSwalProps] = useState({});
//     const navigate = useNavigate(); // hookpara navegar entre paginas
// const mostrar = async ()=>{
//     if (usuario.trim("") === "" && contraseña.trim("") === "" && correo.trim("") === "") { // validacion de espacios vacios
//         setSwalProps({ // SweetAlert para informar al usuario
//           show: true,
//           title: 'Error',
//           text: 'Ingrese sus datos',
//       });
//         return
//     }
//     const UserObte = await userGET // metdo GET para extraer los usuraios ya registrados
//     const validarRegistro = UserObte.find(user => user.correo === correo && user.contrasena === contraseña)// buscamos a las usurios por el correo y la contraseña
//     if (validarRegistro) { // si ya esta registrado se envia una alerta para informar al usuraio
//       setSwalProps({
//         show: true,
//         title: 'Error',
//         text: 'El correo/contraseña ya se encuentran registrados',
//     });
//     }else{
//     userPost(usuario, correo, contraseña) // si no, se hace el post y se registra correctamente
//     setMensaje("Registro exitoso") // se le envia un mensaje de registro exitoso
//     setTimeout(() => {
//       navigate("/login") // se envia al login despues de un segundo
//   }, 1000);
//   }
// }
//     return(
//         <div className="register-page">
//             <div className="register">
//                 <h2 className="iniciarsesion">Registrarse</h2>
//                 <input
//                     className="inputregister"
//                     placeholder="Usuario"
//                     type="text"
//                     value={usuario}
//                     onChange={e => setUsuario(e.target.value)}
//                 />
//                  <input
//                     className="inputregister"
//                     placeholder="Correo"
//                     type="text"
//                     value={correo}
//                     onChange={e => setCorreo(e.target.value)}
//                 />
//                 <input
//                     className="inputregister"
//                     placeholder="Contrasena"
//                     type="password"
//                     value={contraseña}
//                     onChange={e => setContraseña(e.target.value)}
//                 />
//                 <button className="buttonregister" onClick={mostrar}>Registrar</button>

//                 <p className="text-login">
//                     ¿Ya tienes una cuenta? <span className="login-link" onClick={() => navigate("/login")}>Login</span>
//                 </p>
//             </div>
//         </div>
//     );
// }
// export default RegistroForm;



