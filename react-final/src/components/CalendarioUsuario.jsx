import React, { useEffect, useState } from 'react';
import CalendarioGET from '../services/CalendarioGET';
import { useTranslation } from 'react-i18next';

const CalendarioUsuario = ({ restauranteId }) => {
    const [calendarioData, setCalendarioData] = useState([]);
    const { t } = useTranslation()

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
            <h2>{t('High Demand Calendar')}</h2>
            <div className="calendario-grid">
                {calendarioData.length > 0 ? (
                    calendarioData.map((evento) => (
                        <div key={evento.calendario_id} className={`calendario-item ${evento.alta_demanada ? 'alta-demanda' : ''}`}>
                            <h4>{new Date(evento.dia).toLocaleDateString()}</h4>
                            <p>{evento.alta_demanada ? t('High demand') : 'Low demand'}</p>
                        </div>
                    ))
                ) : (
                    <p>{t('There are no events available in the calendar.')}</p>
                )}
            </div>
        </div>
    );
};

export default CalendarioUsuario;

