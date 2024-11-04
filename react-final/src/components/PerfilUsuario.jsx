import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import GET from "../services/GET";
import { useTranslation } from "react-i18next";
import "../style/PerfilUsuario.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { compartirContexto } from "../context/contextProvider";
import Cookies from 'js-cookie';
import DeleteUser from "../services/DeleteUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const PerfilUsuario = () => {
    const { usuario_id } = useParams();
    const [usuariosDetail, setUsuarioDetail] = useState({}); // Inicializar como objeto vacío
    const [loading, setLoading] = useState(true); // Estado de carga
    const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { actualizador, setActu } = compartirContexto();
    const Admi_Acceso = localStorage.getItem("Admi-id")

    useEffect(() => {
        const usuario_authen = localStorage.getItem("Usuario Autenticado_id");
        if (!usuario_authen) {
            navigate("/login");
        } else {
            obtenerDetallesUsuarios();
            const fotoPerfil = localStorage.getItem(`fotoPerfil_${usuario_id}`);
            const usuario = { usuario_id: parseInt(usuario_id), foto: fotoPerfil || null }; 
            setUsuarioDetail(usuario); 
        }
    }, [usuario_id, navigate, Admi_Acceso]);

    const obtenerDetallesUsuarios = async () => {
        try {
            const Users = await GET();
            const Usuarios = Users.find(usu => usu.usuario_id === parseInt(usuario_id));
            if (!Usuarios) {
                setUsuarioDetail(null);
            } else {
                const fotoPerfil = localStorage.getItem(`fotoPerfil_${usuario_id}`);
                setUsuarioDetail({
                    ...Usuarios,
                    foto: fotoPerfil 
                });
            }
        } catch (error) {
            console.error("Error al obtener detalles del usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    const cerrar_sesion = () => {
        localStorage.removeItem("Usuario Autenticado_id");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setActu(actualizador + 1);
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    const eliminar_cuenta = async () => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro? No podrás revertir esto!',
            buttons: [
                {
                    label: 'Sí',
                    onClick: async () => {
                        try {
                            await DeleteUser(usuario_id);
                            Cookies.remove("access_token");
                            Cookies.remove("refresh_token");
                            toast.success("¡Cuenta eliminada con éxito!");
                            setActu(actualizador + 1);
                            setTimeout(() => {
                                navigate("/register");
                            }, 2000);
                            localStorage.removeItem("Usuario Autenticado_id");
                        } catch (error) {
                            toast.error("Error al eliminar la cuenta. Inténtalo de nuevo.");
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        toast.info("Eliminación cancelada.");
                    }
                }
            ]
        });
    };
    

    const CambioFoto = (event) => {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fotoBase64 = reader.result;
                setUsuarioDetail((prevDetail) => ({
                    ...prevDetail,
                    foto: fotoBase64 
                }));
                localStorage.setItem(`fotoPerfil_${usuario_id}`, fotoBase64); 
            };
            reader.readAsDataURL(archivo);
            setModalVisible(false); 
        }
    };

    const eliminarFoto = () => {
        setUsuarioDetail((prevDetail) => ({
            ...prevDetail,
            foto: null 
        }));
        localStorage.removeItem(`fotoPerfil_${usuario_id}`);
        setModalVisible(false); 
    };

    const cambiarFoto = () => {
        document.getElementById('inputFoto').click(); 
    };

    const clickfuera = (e) => {
        if (modalVisible && e.target.id === "miniModal") {
            setModalVisible(false); 
        }
    };

    if (loading) {
        return <div>{t("loading...")}</div>; 
    }

    if (!usuariosDetail) {
        return <div>{t("User not found.")}</div>;
    }

    return (
        <div onClick={clickfuera}>
            <div className="perfil-container">
                <div className="foto-perfil" onClick={() => {
                    if (usuariosDetail.foto) {
                        setModalVisible(true);
                    } else {
                        cambiarFoto(); 
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
                    style={{ display: 'none' }} 
                />
                
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
            <div className="containerlogfav">
            <button className="btnlogout" onClick={cerrar_sesion}> {t('Log Out')}</button>
            {Admi_Acceso && (
                <button className="ir-admin" onClick={() => navigate('/admi')}>
                    Página de Administración
                </button>
            )}
                 <button className="Eliminar" onClick={eliminar_cuenta}>
                 Eliminar Cuenta
             </button>
            </div>
            <br /><br />
            <ToastContainer position="top-center"/>
        </div>
    );
};

export default PerfilUsuario;