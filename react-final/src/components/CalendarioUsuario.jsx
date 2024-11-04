import React, { useEffect, useState } from 'react';
import CalendarioGET from '../services/CalendarioGET';

const CalendarioUsuario = ({ restauranteId }) => {
    const [calendarioData, setCalendarioData] = useState([]);

    useEffect(() => {
        const getCalendarioData = async () => {
            try {
                const id = restauranteId.restauranteId                
                const data = await CalendarioGET(id)
                setCalendarioData(data);
                console.log(data);
            } catch (error) {
                console.error('Error al obtener datos del calendario:', error);
            }
        };
        getCalendarioData();
    }, [restauranteId]); 

    return (
        <div className="calendario-usuario">
            <h2>Calendario de Alta Demanda</h2>
            <div className="calendario-grid">
                {calendarioData.length > 0 ? (
                    calendarioData.map((evento) => (
                        <div key={evento.calendario_id} className={`calendario-item ${evento.alta_demanada ? 'alta-demanda' : ''}`}>
                            <h4>{new Date(evento.dia).toLocaleDateString()}</h4>
                            <p>{evento.alta_demanada ? 'Alta demanda' : 'Baja demanda'}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay eventos disponibles en el calendario.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarioUsuario;

