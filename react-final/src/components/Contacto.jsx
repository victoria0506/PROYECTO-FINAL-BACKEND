import emailjs from 'emailjs-com'
const SERVICE_ID = "service_x7ea73l";  // ID del servicio de emailjs que se usará para enviar el correo.
const TEMPLATE_ID = "template_le3437r";  // ID de la plantilla de emailjs que define cómo se verá el correo.
const PUBLIC_KEY = "VVjiHxNPozqznvBzM";  // Clave pública de emailjs para autenticar las solicitudes.

function Contacto() {
    const  handleOnSubmit = ( e ) => { 
        e. preventDefault (); 
        emailjs. sendForm ( SERVICE_ID , TEMPLATE_ID , e. target , PUBLIC_KEY ) //llamado a sendForm de emailjs para enviar el formulario
          . then ( ( result ) => { 
            console.log (result.text ); 
            alert ( 'Mensaje enviado exitosamente' ) 
          }, ( error ) => { 
            console.log (error.text ); 
            alert ( '¡Algo salió mal!' ) 
          }); 
        e. target.reset () //reinicia
      }
  return (
    <div>
      <form className="formContainer" onSubmit={handleOnSubmit}>
                <h2>Contactanos!</h2>
                <div className="formElement">
            
                    <input type="text" id="from_name" name="from_name" placeholder="Nombre" required />
                </div>

                <div className="formElement">
                    
                    <input type="email" id="from_email" name="from_email" placeholder="Email" required />
                </div>

                <div className="formElement">
                 
                    <textarea name="message" placeholder="Mensaje" required />
                </div>
                <button type='submit' className='formButton'>Enviar</button>
            </form>
    </div>
  )
}

export default Contacto
