import emailjs from 'emailjs-com'
const  SERVICE_ID = "service_x7ea73l" ; 
const  TEMPLATE_ID = "template_le3437r" ; 
const  PUBLIC_KEY = "VVjiHxNPozqznvBzM" ; 

function Contacto() {
    const  handleOnSubmit = ( e ) => { 
        e. preventDefault (); 
        emailjs. sendForm ( SERVICE_ID , TEMPLATE_ID , e. target , PUBLIC_KEY ) 
          . then ( ( result ) => { 
            console.log (result.text ); 
            alert ( 'Mensaje enviado exitosamente' ) 
          }, ( error ) => { 
            console.log (error.text ); 
            alert ( '¡Algo salió mal!' ) 
          }); 
        e. target . reset () 
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
