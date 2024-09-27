import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userGET from "../services/get";
import SweetAlert2 from 'react-sweetalert2';

function LoginForm() {
    const [swalProps, setSwalProps] = useState({});
    const [usuario, setUsu] = useState("");
    const [correo, setcorreo] = useState("");
    const [contrasena, setcontrasena] = useState("");
    const [cargando, setcargando] = useState(false);
    const navigate = useNavigate();

    const validarEmail = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    };

    const Inicio = async () => {
        if (usuario.trim() === "" || correo.trim() === "" || contrasena.trim() === "") {
            setSwalProps({
                show: true,
                title: 'Todos los campos son obligatorios',
            });
            return;
        }

        if (!validarEmail(correo)) {
            setSwalProps({
                show: true,
                title: 'Ingrese un correo electrónico válido',
            });
            return;
        }

        setcargando(true);
        try {
            const comparar = await userGET();
            console.log(comparar);

            if (!comparar || !Array.isArray(comparar)) {
                setSwalProps({
                    show: true,
                    title: 'Error al obtener los datos de usuarios',
                });
                return;
            }

            const encontrarUsuario = comparar.find((e) => e.usuario === usuario && e.correo === correo && e.contrasena === contrasena);
            
            if (encontrarUsuario) {
                alert("Usuario encontrado");
                navigate("/");
            } else {
                setSwalProps({
                    show: true,
                    title: 'Usuario o contraseña incorrectos',
                });
            }
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            setSwalProps({
                show: true,
                title: 'Error en la solicitud',
            });
        } finally {
            setcargando(false);
        }
    }

    return (
        <div className="login-page">
         <img className="background-video" src="src/img/imagenlogin.jpg" alt="" />
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

