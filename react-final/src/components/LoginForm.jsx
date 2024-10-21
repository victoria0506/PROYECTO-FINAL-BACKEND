import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import LoginFech from "../services/loginPost";
import GET from "../services/GET";
import { useTranslation } from "react-i18next";
import { compartirContexto } from "../context/contextProvider";
import "../style/login.css"
import Cookies from 'js-cookie';

function LoginForm () {
    const [swalProps, setSwalProps] = useState({})
    const [usuario, setUsu] = useState("")
    const [correo, setcorreo] = useState("")
    const [contrasena, setcontrasena] = useState("")
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate();
    const [cargando, setcargando] = useState(false)
    const { t } = useTranslation();
    const {actualizador, setActu, apiData, setApiData} = compartirContexto()

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    }

    const Inicio = async () => {
        // Validaciones de entrada
        if (usuario.trim() === "" || correo.trim() === "" || contrasena.trim() === "" || !validarEmail(correo) || contrasena.length < 5) {
            setSwalProps({
                show: true,
                title: 'Error',
                text: 'Ingrese sus datos de manera correcta',
            });
            return;
        }
        try {
            const response = await LoginFech(correo, contrasena)
            console.log("Respuesta del login:", response)
            if (response && response.access_token) {
                // sessionStorage.setItem("access_token", response.access_token)
                // sessionStorage.setItem("refresh_token", response.refresh_token)
                Cookies.set('access_token', response.access_token, { expires: 1, secure: true, sameSite: 'Strict' });
                Cookies.set('refresh_token', response.refresh_token, { expires: 7, secure: true, sameSite: 'Strict' });
                console.log('Tokens guardados en cookies.');

                const userObte = await GET()
                const validarUser = userObte.find(user => user.nombre_usuario === usuario && user.email === correo)
                if (validarUser) {
                    if (validarUser.nombre_usuario === "Administrador" || validarUser.email === "Admi@RestaurApp.com") {
                        localStorage.setItem("Admi-id", validarUser.nombre_usuario)
                        navigate("/admi") 
                        alert("Bienvenido Administrador")
                    } else {
                        localStorage.setItem("Usuario Autenticado_id", validarUser.usuario_id)
                        navigate("/home")
                        setMensaje("Logueo Exitoso")
                    }
                } else {
                    setSwalProps({
                        show: true,
                        title: 'Error',
                        text: 'Usuario no encontrado en la base de datos',
                    });
                }
            } else {
                setSwalProps({
                    show: true,
                    title: 'Error',
                    text: 'Correo o/y Contraseña incorrectas',
                });
            }
        } catch (error) {
            console.error("Error durante el login:", error.message)
            setSwalProps({
                show: true,
                title: 'Error',
                text: 'Ocurrió un error en la autenticación',
            })
        }
    }
    
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
                <p className="text">{t('You dont have an account?')} <Link to='/register'>{t('Register')}</Link></p>
            </div>
            <SweetAlert2 {...swalProps} />
        </div>
    );
}

export default LoginForm;
