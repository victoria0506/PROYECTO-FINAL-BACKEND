
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import userGET from "../services/getUser";
import { useTranslation } from "react-i18next";
import "../style/PerfilUsuario.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { compartirContexto } from "../context/contextProvider";

const PerfilUsuario = () => {
    const { usuario_id } = useParams();
    const [usuariosDetail, setUsuarioDetail] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { actualizador, setActu } = compartirContexto();

    useEffect(() => {
        const usuario_authen = localStorage.getItem("Usuario Autenticado_id");
        if (!usuario_authen) {
            navigate("/login");
        } else {
            obtenerDetallesUsuarios();

        }
    }, [usuario_id, navigate]);

    const obtenerDetallesUsuarios = async () => {
        try {
            const Users = await userGET();
            const Usuarios = Users.find(usu => usu.usuario_id === parseInt(usuario_id));
            if (!Usuarios) {
                setUsuarioDetail(null);
            } else {
                setUsuarioDetail(Usuarios);
            }
        } catch (error) {
            console.error("Error al obtener detalles del usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    const cerrar_sesion = () => {
        localStorage.removeItem("Usuario Autenticado_id")
        setUsuario(null)
        setActu(actualizador + 1)
        setTimeout(() => {
            navigate("/login")
        }, 1000);
      }

    const CambioFoto = (event) => {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUsuarioDetail((prevDetail) => ({
                    ...prevDetail,
                    foto: reader.result // Actualiza la foto en el estado
                }));
                
            };
            reader.readAsDataURL(archivo);
            setModalVisible(false); // Cierra el modal al seleccionar una nueva imagen
        }
    };

    const eliminarFoto = () => {
        setUsuarioDetail((prevDetail) => ({
            ...prevDetail,
            foto: null // Elimina la foto del estado
        }));
        setModalVisible(false); // Cierra el modal después de eliminar la foto
    };

    const cambiarFoto = () => {
        document.getElementById('inputFoto').click(); // Hacer clic en el input de archivos
    };

    const clickfuera = (e) => {
        if (modalVisible && e.target.id === "miniModal") {
            setModalVisible(false); // Cierra el modal si se hace clic fuera de él
        }
    };

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
    }

    if (!usuariosDetail) {
        return <div>No se encontró el usuario.</div>;
    }

    return (
        <div onClick={clickfuera}>
            <div className="perfil-container">
                <div className="foto-perfil" onClick={() => {
                    if (usuariosDetail.foto) {
                        setModalVisible(true);
                    } else {
                        cambiarFoto(); // Si no hay foto, abre el selector de archivos
                    }
                }}>
                    {usuariosDetail.foto ? (
                        <img src={usuariosDetail.foto} alt="Foto de perfil" />
                    ) : (
                        <FontAwesomeIcon className="icono-agregar" icon={faUser} />
                    )}
                </div>
                <input
                    id="inputFoto"
                    type="file"
                    accept="image/*"
                    onChange={CambioFoto}
                    style={{ display: 'none' }} // Ocultar el input
                />
                
                {/* Mini modal que se muestra solo si hay una foto */}
                {modalVisible && usuariosDetail.foto && (
                    <div id="miniModal" className="mini-modal">
                        <div className="mini-modal-content">
                            <p onClick={cambiarFoto}>{t('cambiar')}</p>
                            <p onClick={eliminarFoto}>{t('eliminar')}</p>
                        </div>
                    </div>
                )}
        </div>
            <h3 className="perfil-titulo">{usuariosDetail.nombre_usuario}</h3>
            <h3 className="perfil-email">{usuariosDetail.email}</h3>
            <div className="btn-container">
            <button className="btnlogin" onClick={cerrar_sesion}>
            {t('logout')} 
          </button>
            <button className="cerrar-secion" onClick={() => navigate(`/favoritos/${usuario_id}`)}>Mis favoritos</button>
            </div>
        </div>
    );
};

export default PerfilUsuario;



