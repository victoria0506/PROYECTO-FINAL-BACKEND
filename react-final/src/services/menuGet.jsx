const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";

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
