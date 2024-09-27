import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import GETuser from "../services/get";

function LoginForm() {
    const [swalProps, setSwalProps] = useState({});
    const [usuario, setUsu] = useState("");
    const [correo, setcorreo] = useState("");
    const [contrasena, setcontrasena] = useState("");
    const [cargando, setcargando] = useState(false);
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate();

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    };

    const Inicio = async () => {
        if (usuario.trim() === "" && correo.trim() === "" && contrasena.trim("") === "") { // validar que no se pueda loguear con estacios vacios
            setSwalProps({ // SweetAlert
              show: true,
              title: 'Error',
              text: 'Ingrese sus datos',
          });
            //console.log("no encontrado");
              return
          }else{
           const UserObte = await GETuser()
           console.log(UserObte);// Llamamos al metodo GET para extraer los datos guardados en nuestra api 
           const validarUser = UserObte.find((user) => user.nombre_usuario === usuario && user.email === correo && user.contrasena === contrasena) // El .find va a buscar
           if (validarUser) { 
              console.log("encontrado");
              setMensaje("Logueo Exitoso") // Mensaje para que el usuraio este informado que su logueo fue exitoso
              setTimeout(() => {
                  navigate("/home") // Navegacion hacia la pagina de Home, despues de un segundo
              }, 1000);
           } else {
              setSwalProps({ // SweetAlert para informar al usuario que sus datos son incorrectos
                show: true,
                title: 'Error',
                text: 'Correo o/y Contraseña incorrectas',
            });
           }
    }   }

    return (
        <div className="login-page">
            <div className="login">
                <h2 className="iniciarsesion">Login</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    className="input"
                    value={usuario}
                    onChange={e => setUsu(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Correo"
                    className="input"
                    value={correo}
                    onChange={e => setcorreo(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="input"
                    value={contrasena}
                    onChange={e => setcontrasena(e.target.value)}
                />
                
                <button className="btnlog" onClick={Inicio} disabled={cargando}>
                    {cargando ? "Cargando..." : "Login"}
                </button>
                <p>No tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
            </div>
            <SweetAlert2 {...swalProps} />
        </div>
    );
}

export default LoginForm;

