const authenticator = async () => {
    try {
      const Token= "a53ecb17b9b53418b44507fe226c0cf6490508f1";
      //const Token= "07881b7aeb97068cd9925d768fd3af4b77cb7eab"
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