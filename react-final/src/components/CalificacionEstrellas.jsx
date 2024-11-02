import { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import calificacionPOST from "../services/CalificacionPOST";
import CalifiGET from "../services/calificacionGet";
import CaliPut from "../services/CalificacionPut";
import '../style/paginarestaurantes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalificacionEstrellas = ({ restauranteId }) => {
  const [calificacion, setCalificacion] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const usuario_id = Number(localStorage.getItem("Usuario Autenticado_id"));
  restauranteId = Number(restauranteId);

  const obtenerCalificaciones = async () => {
    try {
      const califi = await CalifiGET();
      const calificacionesExi = califi.find(cal => cal.usuario_id === usuario_id && cal.restaurante_id === restauranteId);
      
      if (calificacionesExi) {
        setCalificacion(calificacionesExi.calificacion);
        localStorage.setItem(`calificacion_${restauranteId}_${usuario_id}`, calificacionesExi.calificacion);
      }

      const totalRating = califi.filter(cal => cal.restaurante_id === restauranteId)
        .reduce((sum, cal) => sum + cal.calificacion, 0);
      const count = califi.filter(cal => cal.restaurante_id === restauranteId).length;
      const avg = count > 0 ? totalRating / count : 0;
      setAverageRating(avg);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener calificaciones.");
    }
  };

  useEffect(() => {
    const calificacionGuardada = localStorage.getItem(`calificacion_${restauranteId}_${usuario_id}`);
    if (calificacionGuardada) {
      setCalificacion(Number(calificacionGuardada));
    } else if (usuario_id) {
      obtenerCalificaciones();
    }
  }, [usuario_id, restauranteId]);

  const califiDada = async (rate) => {
    if (usuario_id) {
      const califi = await CalifiGET();
      const calificacionesExi = califi.find(cal => cal.usuario_id === usuario_id && cal.restaurante_id === restauranteId);

      if (calificacionesExi) {
        const confi = confirm("¿Desea actualizar calificación?");
        if (confi) {
          await CaliPut(calificacionesExi.calificacion_id,usuario_id,restauranteId,rate);
          setCalificacion(rate);
          localStorage.setItem(`calificacion_${restauranteId}_${usuario_id}`, rate);
          obtenerCalificaciones(); 
        }
      } else {
        await calificacionPOST(restauranteId, usuario_id,rate );
        setCalificacion(rate);
        localStorage.setItem(`calificacion_${restauranteId}_${usuario_id}`, rate);
        obtenerCalificaciones();  
      }
    } else {
      toast.error("Registre o inicie sesión para calificar");
    }
  };

  return (
    <div className="estrellas">
      <Rating
        fillColor='#f1d045'
        initialValue={calificacion}
        onClick={califiDada}
        transition
        allowHover={usuario_id}
        readonly={!usuario_id}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CalificacionEstrellas;