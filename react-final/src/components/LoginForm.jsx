import { useState } from "react";
import { Link } from "react-router-dom";
import userGET from "../services/get";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';

function LoginForm() {
    const [swalProps, setSwalProps] = useState({});
    const [usuario, setUsu] = useState("");
    const [Contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const Inicio = async () => {
        if (usuario.trim() === "" && Contrasena.trim() === "") {
            setSwalProps({
                show: true,
                title: 'Ingrese un texto',
            });
        } else {
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

                const encontrarUsuario = comparar.find((e) => e.name === usuario && e.email === Contrasena);
                
                if (encontrarUsuario) {
                    alert("Usuario encontrado");
                    navigate("/");
                } else {
                    setSwalProps({
                        show: true,
                        title: 'Usuario o contraseña incorrecto',
                    });
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
                setSwalProps({
                    show: true,
                    title: 'Error en la solicitud',
                });
            }
        }
    }

    return (
        <div className="login-page">
            <div className="login">
                <h2 className="iniciarsesion">Login</h2>
                <input
                    type="text"
                    placeholder="Enter your email"
                    className="input"
                    value={usuario}
                    onChange={e => setUsu(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input"
                    value={Contrasena}
                    onChange={e => setContrasena(e.target.value)}
                />
                
                <button className="btnlog" onClick={Inicio}>Login</button>
                <p>Dont have an account? <Link to='/register'>Signup</Link></p>
            </div>
            <SweetAlert2 {...swalProps} />
        </div>
        
    );
    }

export default LoginForm;
