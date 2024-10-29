import emailjs from 'emailjs-com';
import '../style/contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SERVICE_ID = "service_cfe5cjv";
const TEMPLATE_ID = "template_mdxf1vv";
const PUBLIC_KEY = "ABs5xbm6PLuOPnJNm";

function Contacto() {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        toast.success('Mensaje enviado exitosamente');
      }, (error) => {
        console.log(error.text);
        toast.error('¡Algo salió mal!');
      });
    e.target.reset();
  };

  return (
    <div className="contact-container">
      <div className="info-box">
        <h2>Contáctanos</h2>
        <p className="contact-info">Teléfono: +506 12345678</p>
        <p className="contact-info">Email: ConsultasRestaurApp@gmail.com</p>
      </div>
      <form className="contact-form" onSubmit={handleOnSubmit}>
        <input type="text" name="from_name" placeholder="Nombre" required className="form-input"/>
        <input type="email" name="from_email" placeholder="Email" required className="form-input"/>
        <textarea name="message" placeholder="Mensaje" required className="form-textarea"/>
        <button type="submit" className="form-button">Enviar</button>
      </form>
      <ToastContainer position="top-center"/>
    </div>
  );
}

export default Contacto;




