import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginFech from "../services/loginPost";
import GET from "../services/GET";
import { useTranslation } from "react-i18next";
import { compartirContexto } from "../context/contextProvider";
import "../style/login.css";
import toastr from 'toastr'; // Importa toastr
import 'toastr/build/toastr.min.css'; // Importa el CSS de Toastr

function LoginForm() {
    const [usuario, setUsu] = useState("");
    const [correo, setcorreo] = useState("");
    const [contrasena, setcontrasena] = useState("");
    const navigate = useNavigate();
    const [cargando, setcargando] = useState(false);
    const { t } = useTranslation();
    const { actualizador, setActu } = compartirContexto();

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    };

    const Inicio = async () => {
        if (usuario.trim() === "" || correo.trim() === "" || contrasena.trim() === "" || !validarEmail(correo) || contrasena.length < 5) {
            toastr.error(t("enterCorrectData")); // Usar toastr para mostrar error
            return;
        }
        try {
            const response = await LoginFech(correo, contrasena);
            console.log("Respuesta del login:", response);
            if (response && response.access_token) {
                const userObte = await GET();
                const validarUser = userObte.find(user => user.nombre_usuario === usuario && user.email === correo);
                if (validarUser) {
                    if (validarUser.nombre_usuario === "Administrador" || validarUser.email === "Admi@RestaurApp.com") {
                        localStorage.setItem("Admi-id", validarUser.nombre_usuario);
                        navigate("/admi");
                        toastr.success(t("welcomeAdmin")); // Usar toastr para mostrar éxito
                        setActu(actualizador + 1);
                    } else {
                        localStorage.setItem("Usuario Autenticado_id", validarUser.usuario_id);
                        navigate("/home");
                        toastr.success(t("loginSuccess")); // Usar toastr para mostrar éxito
                        setActu(actualizador + 1);
                    }
                } else {
                    toastr.error(t("userNotFound")); // Usar toastr para mostrar error
                }
            } else {
                toastr.error(t("incorrectEmailPassword")); // Usar toastr para mostrar error
            }
        } catch (error) {
            console.error("Error durante el login:", error.message);
            toastr.error(t("authError")); // Usar toastr para mostrar error
        }
    };

    return (
        <div className="login-page">
            <div className="login">
                <img className="logologinregister" src="/src/img/logonav.png" alt="" />
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
                    {cargando ? t('loading...') : t('Login')}
                </button>
                <p className="text">{t('You dont have an account?')} <Link to='/register'>{t('Register')}</Link></p>
            </div>
        </div>
    );
}

export default LoginForm;

