import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import userGET from "../services/getUser";
import { useTranslation } from "react-i18next";

function LoginForm () {
    const [swalProps, setSwalProps] = useState({});
    const [usuario, setUsu] = useState("");
    const [correo, setcorreo] = useState("");
    const [contrasena, setcontrasena] = useState("");
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate();
    const [cargando, setcargando] = useState(false);
    const { t } = useTranslation();

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    };

    const Inicio = async () => {
        if (usuario.trim() === "" && correo.trim() === "" && contrasena.trim("") === "" && !validarEmail(correo) || contrasena.length < 5) { // validar que no se pueda loguear con estacios vacios
            setSwalProps({ // SweetAlert
              show: true,
              title: 'Error',
              text: 'Ingrese sus datos de manera correcta',
            });
              return
            }else{
                const UserObte = await userGET()// Llamamos al metodo GET para extraer los datos guardados en nuestra api 
                const validarUser = UserObte.find((user) => user.nombre_usuario === usuario && user.email === correo && user.contrasena === contrasena) // El .find va a buscar
                if (validarUser) { 
                setcargando(true)
                setTimeout(() => {
                    navigate("/home") // Navegacion hacia la pagina de Home, despues de un segundo
                }, 1000);
                setMensaje("Logueo Exitoso")
            }else{
              setSwalProps({ // SweetAlert para informar al usuario que sus datos son incorrectos
                show: true,
                title: 'Error',
                text: 'Correo o/y Contraseña incorrectas',
            });
           }
    }   }

    return (
        <div className="login-page">
         <img className="background-video" src="src/img/.jpg" alt="" />
            <div className="login">
                <h2 className="iniciarsesion">Login</h2>
                <h5>{mensaje}</h5>
                <input
                    type="text"
                    placeholder={t('User')}
                    className="input"
                    value={usuario}
                    onChange={e => setUsu(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t('Email')}
                    className="input"
                    value={correo}
                    onChange={e => setcorreo(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={t('Password')}
                    className="input"
                    value={contrasena}
                    onChange={e => setcontrasena(e.target.value)}
                />
                <button className="boton-login" onClick={Inicio}>
                     {cargando ? t('Charging') : t('Login')}
                </button>
                <p>{t('You dont have an account?')} <Link to='/register'>{t('Register')}</Link></p>
            </div>
            <SweetAlert2 {...swalProps} />
        </div>
    );
}

export default LoginForm;
