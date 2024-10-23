import { useState } from 'react';
import '../style/Calendario.css';

const Calendario = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [importantDates, setImportantDates] = useState({}); // Guardar días importantes

  const markImportantDate = (day) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const dateKey = `${year}-${month}-${day}`;
    const note = prompt("Enter a note for this day:");
    
    if (note) {
      setImportantDates({
        ...importantDates,
        [dateKey]: note,
      });
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
      const isImportant = importantDates[dateKey];
      
      days.push(
        <div
          key={day}
          className={`day ${day === currentDate.getDate() ? 'current' : ''} ${isImportant ? 'important' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, day))}
          onDoubleClick={() => markImportantDate(day)}
        >
          {day}
          {isImportant && (
            <div className="popup">
              {importantDates[dateKey]}
            </div>
          )}
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
