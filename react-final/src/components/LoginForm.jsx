import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import LoginFech from "../services/loginPost";
import GET from "../services/GET";
import { useTranslation } from "react-i18next";
import { compartirContexto } from "../context/contextProvider";
import "../style/login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm () {
    const [swalProps, setSwalProps] = useState({})
    const [usuario, setUsu] = useState("")
    const [correo, setcorreo] = useState("")
    const [contrasena, setcontrasena] = useState("")
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate();
    const [cargando, setcargando] = useState(false)
    const { t } = useTranslation();
    const {actualizador, setActu} = compartirContexto()

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    }

    const Inicio = async () => {
        // Validaciones de entrada
        if (usuario.trim() === "" || correo.trim() === "" || contrasena.trim() === "" || !validarEmail(correo) || contrasena.length < 5) {
            toast.error('Ingrese sus datos de manera correcta')
            return;
        }
        try {
            const response = await LoginFech(correo, contrasena)
            console.log("Respuesta del login:", response)
            if (response && response.access_token) {
                const userObte = await GET()
                const validarUser = userObte.find(user => user.nombre_usuario === usuario && user.email === correo)
                if (validarUser) {
                    if (validarUser.nombre_usuario === "Administrador" || validarUser.email === "Admi@RestaurApp.com") {
                        localStorage.setItem("Admi-id", validarUser.nombre_usuario)
                        navigate("/admi") 
                        toast.success('Bienvenido Administrador')
                        setActu(actualizador + 1)
                    } else {
                        localStorage.setItem("Usuario Autenticado_id", validarUser.usuario_id)
                        navigate("/home")
                        setMensaje("Logueo Exitoso")
                        setActu(actualizador + 1)
                    }
                } else {
                    toast.error('Usuario no encontrado en la base de datos')
                }
            } else {
                toast.error('Correo o/y Contraseña incorrectas')
            }
        } catch (error) {
            console.error("Error durante el login:", error.message)
            toast.error('Ocurrió un error en la autenticación')
        }
    }
    
    return (
        <div className="login-page">
            <div className="login">
                <img className="logologinregister" src="/src/img/logonav.png" alt="" />
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
            <ToastContainer position="top-center"/>
        </div>
    );
}

export default LoginForm;
