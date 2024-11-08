import { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import calificacionPOST from "../services/CalificacionPOST";
import CalifiGET from "../services/calificacionGet";
import CaliPut from "../services/CalificacionPut";
import '../style/paginarestaurantes.css';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import Swal from 'sweetalert2'; // Importa SweetAlert

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
            toastr.error("Error al obtener calificaciones.");
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
                const { isConfirmed } = await Swal.fire({
                    title: 'Actualizar calificación',
                    text: "¿Desea actualizar su calificación?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, actualizar',
                    cancelButtonText: 'Cancelar',
                });

                if (isConfirmed) {
                    await CaliPut(calificacionesExi.calificacion_id, usuario_id, restauranteId, rate);
                    setCalificacion(rate);
                    localStorage.setItem(`calificacion_${restauranteId}_${usuario_id}`, rate);
                    obtenerCalificaciones(); 
                    toastr.success("Calificación actualizada exitosamente."); 
                }
            } else {
                await calificacionPOST(restauranteId, usuario_id, rate);
                setCalificacion(rate);
                localStorage.setItem(`calificacion_${restauranteId}_${usuario_id}`, rate);
                obtenerCalificaciones();  
                toastr.success("Calificación agregada exitosamente."); 
            }
        } else {
            toastr.error("Registre o inicie sesión para calificar");
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
        </div>
    );
};

export default CalificacionEstrellas;
