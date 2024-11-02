const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";
const authenticator = async () => {
    try {
      // const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
      const response = await fetch('http://localhost:8000/api/ImagenApi/', {
        headers: {
          'Authorization': `Token ${Token}`
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

export default authenticator