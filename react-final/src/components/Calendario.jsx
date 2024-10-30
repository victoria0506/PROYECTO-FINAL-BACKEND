import { useState } from 'react';
import '../style/Calendario.css';
import CalendarioPOST from '../services/CalendarioPost';

const Calendario = ({ restauranteId }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dates, setDates] = useState({});

  const markDate = async (day) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const tipo = prompt("Select type: 1 for High Demand, 2 for Event, 3 for Normal");
    const note = prompt("Enter a note for this day:");

    if (tipo && note) {
      let dayType;
      if (tipo === "1") dayType = 'alta_demanda';
      else if (tipo === "2") dayType = 'evento';
      else dayType = 'normal';

      setDates({
        ...dates,
        [dateKey]: { tipo: dayType, nota: note },
      });

      await CalendarioPOST({ dia: dateKey, tipo: dayType, nota: note, restaurante_id: restauranteId });
    }
  };

  const generateDays = () => {
    const days = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${year}-${month}-${day}`;
      const dayData = dates[dateKey];
      const dayTypeClass = dayData?.tipo === 'alta_demanda'
        ? 'high-demand'
        : dayData?.tipo === 'evento'
        ? 'event'
        : '';

      days.push(
        <div
          key={day}
          className={`day ${day === currentDate.getDate() ? 'current' : ''} ${dayTypeClass}`}
          onClick={() => setSelectedDate(new Date(year, month, day))}
          onDoubleClick={() => markDate(day)}
        >
          {day}
          {dayData?.nota && <div className="popup">{dayData.nota}</div>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-header">{day}</div>
        ))}
      </div>
      <div className="body">{generateDays()}</div>
    </div>
  );
};

export default Calendario;



