// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff";
const authenticator = async () => {
    try {
      const Token= "7c16915bdb9a49db600e785ae7cd9f0bf17eb4d1"
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