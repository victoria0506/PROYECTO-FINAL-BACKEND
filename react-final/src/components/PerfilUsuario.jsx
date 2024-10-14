import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import userGET from "../services/getUser";
import { useTranslation } from "react-i18next";
import "../style/PerfilUsuario.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { compartirContexto } from "../context/contextProvider";

const PerfilUsuario = () => {

    const {usuario_id} = useParams()
    const [usuariosDetail, setUsuarioDetail] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const {actualizador, setActu, apiData, setApiData} = compartirContexto()
    
    const obtenerDetallesUsuarios = async () => {
        const Users = await userGET();
        const Usuarios = Users.find(usu => String(usu.usuario_id) === usuario_id);
        if (!Usuarios) {
            throw new Error("Usuario no encontrado");
        }else{
            setUsuarioDetail(Usuarios);
        }
    };

    useEffect(() => {
        obtenerDetallesUsuarios();
    }, [usuario_id]);

    const cerrar_sesion = () => {
        localStorage.removeItem("Usuario Autenticado_id")
        navigate("/home")
        setUsuario(null)
        setActu(actualizador + 1)
      }

    if(!usuariosDetail){
        return <div>No se encontró el usuario.</div> 
    } 

  return (
    <div>
        <div className="perfil-container">
        <div className="foto-perfil" onClick={() => alert("Cambiar foto")}>
                {usuariosDetail.foto ? (
                    <img src={usuariosDetail.foto} alt="Foto de perfil" />
                ) : (
                    <FontAwesomeIcon className="icono-agregar" icon={faUser} />
                )}
        </div>
            <h3 className="perfil-titulo">{usuariosDetail.nombre_usuario}</h3>
            <h3 className="perfil-email">{usuariosDetail.email}</h3>
            <div className="btn-container">
            <button className="btnlogin" onClick={cerrar_sesion}>
            {t('logout')} 
          </button>
            <button className="cerrar-secion">Mis favoritos</button>
            </div>
        </div>
    </div>
  )
}

export default PerfilUsuario
