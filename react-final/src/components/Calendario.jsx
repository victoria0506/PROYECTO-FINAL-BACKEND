// Importamos el hook useState de React para manejar el estado del componente
import { useState } from 'react';
// Importamos el archivo CSS para aplicar estilos al calendario
import '../style/Calendario.css';
// Importamos un servicio para enviar datos al backend
import CalendarioPOST from '../services/CalendarioPost';

// Definimos el componente Calendario, que recibe un ID de restaurante como propiedad
const Calendario = ({ restauranteId }) => {
  // Creamos un arreglo con los días de la semana
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Obtenemos la fecha actual
  const currentDate = new Date();
  // Usamos el hook useState para definir la fecha seleccionada y la inicializamos con la fecha actual
  const [selectedDate, setSelectedDate] = useState(currentDate);
  // Usamos el hook useState para almacenar las fechas marcadas en un objeto
  const [dates, setDates] = useState({});

  // Definimos la función markDate para marcar un día con un tipo y una nota
  const markDate = async (day) => {
    // Obtenemos el año y el mes de la fecha seleccionada
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    // Creamos una clave de fecha en el formato "YYYY-MM-DD"
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // Pedimos al usuario que seleccione el tipo de día (alta demanda, evento, normal)
    const tipo = prompt("Select type: 1 for High Demand, 2 for Event, 3 for Normal");
    // Pedimos al usuario que ingrese una nota para ese día
    const note = prompt("Enter a note for this day:");

    // Verificamos que se haya ingresado un tipo y una nota
    if (tipo && note) {
      // Inicializamos la variable dayType según la opción seleccionada
      let dayType;
      if (tipo === "1") dayType = 'alta_demanda'; // Alta demanda
      else if (tipo === "2") dayType = 'evento'; // Evento
      else dayType = 'normal'; // Normal

      // Actualizamos el estado de las fechas marcadas con la nueva información
      setDates({
        ...dates,
        [dateKey]: { tipo: dayType, nota: note },
      });

      // Enviamos los datos de la fecha marcada al backend
      await CalendarioPOST({ dia: dateKey, tipo: dayType, nota: note, restaurante_id: restauranteId });
    }
  };

  // Definimos la función generateDays para crear los días del calendario
  const generateDays = () => {
    const days = []; // Creamos un arreglo vacío para almacenar los días
    const year = selectedDate.getFullYear(); // Obtenemos el año de la fecha seleccionada
    const month = selectedDate.getMonth(); // Obtenemos el mes de la fecha seleccionada
    const firstDay = new Date(year, month, 1).getDay(); // Obtenemos el primer día del mes
    const totalDays = new Date(year, month + 1, 0).getDate(); // Obtenemos el total de días en el mes

    // Agregamos espacios vacíos al inicio del calendario para alinear los días correctamente
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />); // Espacio vacío
    }
    
    // Creamos los días del mes y los agregamos al arreglo days
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${year}-${month}-${day}`; // Creamos la clave de la fecha
      const dayData = dates[dateKey]; // Obtenemos la información del día si está marcada
      // Determinamos la clase CSS para el día según su tipo
      const dayTypeClass = dayData?.tipo === 'alta_demanda'
        ? 'high-demand' // Si es alta demanda, asignamos la clase correspondiente
        : dayData?.tipo === 'evento'
        ? 'event' // Si es un evento, asignamos la clase correspondiente
        : ''; // Si no tiene tipo, no asignamos ninguna clase

      // Agregamos un div para representar el día en el calendario
      days.push(
        <div
          key={day} // Asignamos una clave única para cada día
          className={`day ${day === currentDate.getDate() ? 'current' : ''} ${dayTypeClass}`} // Asignamos clases para el día actual y su tipo
          onClick={() => setSelectedDate(new Date(year, month, day))} // Al hacer clic, se selecciona el día
          onDoubleClick={() => markDate(day)} // Al hacer doble clic, se marca el día
        >
          {day}
          {dayData?.nota && <div className="popup">{dayData.nota}</div>} 
        </div>
      );
    }
    return days; // Retornamos el arreglo de días
  };

  // Retornamos el JSX que representa el componente del calendario
  return (
    <div className="calendar"> 
      <div className="header"> 
        {daysOfWeek.map((day) => ( // Iteramos sobre los días de la semana
          <div key={day} className="day-header">{day}</div> // Creamos un div para cada día de la semana
        ))}
      </div>
      <div className="body">{generateDays()}</div> 
    </div>
  );
};

// Exportamos el componente Calendario para que pueda ser utilizado en otras partes de la aplicación
export default Calendario;




