const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
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