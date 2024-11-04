const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

const menuGet = async (restaurante_id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/menu/?restaurante_id=${restaurante_id}`, {
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
    return data.length > 0 ? data[0] : null; // Retorna el primer menú encontrado

  } catch (error) {
    console.error('Error fetching menu data:', error);
    return null;
  }
};

export default menuGet;
