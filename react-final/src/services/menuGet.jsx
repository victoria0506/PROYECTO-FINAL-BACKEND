const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"
//const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"

const menuGet = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/menu/${restauranteId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${Token}`,
            'Content-Type': 'application/json',
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setMenuData(data); // Almacenar el menú específico
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
};

export default menuGet