// const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1"
const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"

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