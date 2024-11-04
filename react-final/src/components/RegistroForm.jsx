import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GET from "../services/GET";
import { useTranslation } from "react-i18next";
import '../style/register.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function RegistroForm() {
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [cargando, setcargando] = useState(false);
    const navigate = useNavigate(); 
    const { t } = useTranslation();

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    };

    const mostrar = async () => {
        if (usuario.trim() === "" || contraseña.trim() === "" || correo.trim() === "" || !validarEmail(correo) || contraseña.length < 5) {
            toastr.error(t("fillAllDataCorrectly"));
            return;
        } else {
            setcargando(true); 
            const UserObte = await GET(); 
            const validarRegistro = UserObte.find(user => 
                user.nombre_usuario === usuario && user.email === correo && user.contrasena === contraseña
            ); 
            if (!validarRegistro) { 
                await userPost(usuario, correo, contraseña);
                toastr.success(t("registrationSuccessful")); 
                setTimeout(() => {
                    navigate("/login"); 
                }, 1000);
            } else {
                toastr.error(t("userAlreadyRegistered"));
            }
        }
    };

    return (
        <div className="login4">
            <div className="logn6">
                <img className="logologinregister" src="/src/img/logonav.png" alt="" />
                <input type="text" className="inRegi" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder={t('User')} />
                <input type="text" className="inRegi" value={correo} onChange={e => setCorreo(e.target.value)} placeholder={t('Email')} />
                <input type="text" className="inRegi" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder={t('Password')} />
                <div className="botones">
                    <button onClick={mostrar}>
                        {cargando ? t('loading...') : t('Register')}
                    </button>
                    <p className="text">{t('Do you have an account?')} <Link to='/login'>{t('Login')}</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegistroForm;
