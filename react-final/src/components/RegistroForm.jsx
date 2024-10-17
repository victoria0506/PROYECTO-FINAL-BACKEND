import {useState } from "react"
import { Link } from "react-router-dom"
import GET from "../services/GET";
import { useNavigate } from "react-router-dom"
import SweetAlert2 from 'react-sweetalert2';
import userPost from "../services/postUser";
import { useTranslation } from "react-i18next";
import '../style/register.css'

function RegistroForm() {
  // declaramos los hooks
    const [usuario, setUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [swalProps, setSwalProps] = useState({});
    const [cargando, setcargando] = useState(false);
    const navigate = useNavigate(); // hookpara navegar entre paginas
    const { t } = useTranslation();

    const validarEmail = (correo) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(correo);
    };
    
    const mostrar = async () => {
      if (usuario.trim() === "" || contraseña.trim() === "" || correo.trim() === "" || !validarEmail(correo) || contraseña.length < 5) {
        setSwalProps({ 
          show: true,
          title: 'Error',
          text: 'Ingrese todos los datos correctamente, incluyendo un correo válido y una contraseña de al menos 5 caracteres.',
        });
        return;
      } else {
        setcargando(true); 
        const UserObte = await GET(); 
        const validarRegistro = UserObte.find(user => 
          user.nombre_usuario === usuario && user.email === correo && user.contrasena === contraseña
        ); 
        if (!validarRegistro) { 
          await userPost(usuario, correo, contraseña);
          setMensaje("Registro exitoso"); 
          setTimeout(() => {
            navigate("/login"); 
          }, 1000);
        } else {
          setSwalProps({
            show: true,
            title: 'Error',
            text: 'El correo/contraseña ya se encuentran registrados',
          });
        }
      }
    };
  return (
    <div className="login4">
       <div className="logn6">
        <h2>{t('Register')}</h2>
        <h5>{mensaje}</h5>
        <input type="text" className="inRegi" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder={t('User')}/>
        <input type="text" className="inRegi" value={correo} onChange={e => setCorreo(e.target.value)} placeholder={t('Email')}/>
        <input type="text" className="inRegi" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder={t('Password')}/>
        <div className="botones">
        <button onClick={mostrar}>
          {cargando ? t('Charging...') : t('Register')}
        </button>
        <p className="text">{t('Do you have an account?')}<Link to='/login'>Login</Link></p>
        </div>
       </div>
       <div>
       <SweetAlert2 {...swalProps} />
       </div>
    </div>
  )
}
export default RegistroForm