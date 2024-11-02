const Token = "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";
const fetchMenuData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/menu/', {
        method: 'GET',
        headers: {
        'Authorization': `Token ${Token}`, // Reemplaza con tu token
          'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido es correcto
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMenuData(data[0]); // Asumiendo que solo quieres el primer menú
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  
  export default fetchMenuData