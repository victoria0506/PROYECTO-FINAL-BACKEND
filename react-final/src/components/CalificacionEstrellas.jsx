import { useState } from "react"
import { Rating } from 'react-simple-star-rating';
import RestaGet from "../services/getRestaurant";
import calificacionPOST from "../services/CalificacionPOST";

const CalificacionEstrellas = ({restauranteId}) => {
    const [calificacion, setCalificacion] = useState(0)
    const usuario_id = localStorage.getItem("Usuario Autenticado_id") 


    const califiDada = async (rate) => {
      if (usuario_id) {
        setCalificacion(rate)
        console.log(`calificacion dada : ${rate}`)
        console.log(restauranteId);
        calificacionPOST(restauranteId,usuario_id,rate)
      }else{
        alert("Registre o inicie sesion para calificar")
      }
    }
    const onPointerEnter = () => console.log('Enter')

  return (
    <div>
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
      />
    </div>
  )
}

export default CalificacionEstrellas
