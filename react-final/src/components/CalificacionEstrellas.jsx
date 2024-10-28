import { useEffect, useState } from "react"
import { Rating } from 'react-simple-star-rating';
import calificacionPOST from "../services/CalificacionPOST";
import CalifiGET from "../services/calificacionGet";
import CaliPut from "../services/CalificacionPut";
import '../style/paginarestaurantes.css'

const CalificacionEstrellas = ({restauranteId}) => {
  const [calificacion, setCalificacion] = useState(0)
  const usuario_id = Number(localStorage.getItem("Usuario Autenticado_id")) 
  restauranteId = Number(restauranteId)

  const obtenerCalificaciones = async () => {
      try{
        const califi = await CalifiGET()
        console.log("get de calificaciones: ", califi)
        const calificacionesExi = califi.find(cal => cal.usuario_id === usuario_id && cal.restaurante_id === restauranteId)
        console.log("Calificación existente:", calificacionesExi)
        if (calificacionesExi) {
          setCalificacion(calificacionesExi.calificacion)
        }
      }catch (error){
      console.log(error);
      }
  }

  useEffect(() => {
    if (usuario_id) {
      obtenerCalificaciones()
    }
  }, [usuario_id, restauranteId])

  const califiDada = async (rate) => {
    if (usuario_id) {
      const califi = await CalifiGET()
      console.log("get de calificaciones: ", califi)
      const calificacionesExi = califi.find(cal => cal.usuario_id === usuario_id && cal.restaurante_id === restauranteId)
      console.log("Calificación existente:", calificacionesExi)
      if (calificacionesExi) {
        const confi = confirm("Desea actualizar calificacion")
        if (confi) {
            await CaliPut(calificacionesExi.calificacion_id, usuario_id, restauranteId, rate)
            setCalificacion(rate)
        }else{
          console.log("no actu");
        }
      }else{
        await calificacionPOST(restauranteId,usuario_id,rate)
        setCalificacion(rate)
      }
    }else {
      alert("Registre o inicie sesión para calificar");
    }
  }
  const onPointerEnter = () => {
    if (!usuario_id) {
      console.log("El usuario no esta Autenticado");
    }
  }

  return (
    <div className="estrellas">
      <Rating
          fillColorArray={[
            '#f14f45',
            '#f16c45',
            '#f18845',
            '#f1b345',
            '#f1d045'
          ]}
        onClick={califiDada}
        onPointerEnter={onPointerEnter}
        ratingValue={calificacion}
        transition
        allowHover={usuario_id}
        readonly={!usuario_id}
      />
    </div>
  )
}

export default CalificacionEstrellas

