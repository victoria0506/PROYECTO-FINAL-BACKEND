import { useState } from "react";
//imp userPost para realizar la solicitud de registro
import userPost from "../services/post";
import { useNavigate } from "react-router-dom";

function RegistroForm() {
    
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const navigate = useNavigate();

    const mostrar = async () => {
        if (usuario.trim() === "" || contraseña.trim() === "" || confirmarContraseña.trim() === "") {
            alert("Por favor, complete todos los campos");
        } else if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden");
        } else {
            await userPost(usuario, contraseña);
            alert("Registro exitoso");
            navigate("/login");
        }
    }

    return (
        <div className="register-page">
            <div className="register">
                <h2 className="iniciarsesion">Registrarse</h2>
                <input
                    className="inputregister"
                    placeholder="Usuario"
                    type="text"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
                <input
                    className="inputregister"
                    placeholder="Contraseña"
                    type="password"
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                />
                <input
                    className="inputregister"
                    placeholder="Confirmar contraseña"
                    type="password"
                    value={confirmarContraseña}
                    onChange={e => setConfirmarContraseña(e.target.value)}
                />
                <button className="buttonregister" onClick={mostrar}>Registrar</button>

                <p className="text-login">
                    ¿Ya tienes una cuenta? <span className="login-link" onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
}
export default RegistroForm;