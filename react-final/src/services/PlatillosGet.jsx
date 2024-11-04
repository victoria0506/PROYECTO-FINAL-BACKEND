const Token= "f083b6b41d2cecbd2ddd54743696a65ae3269f6a"
// const Token= "f866b41d3b0472f21a4cf5befa3a687c8c47f2ff"

const PlatillosGet = async (restaurante_id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/Platillos/?restaurante_id=${restaurante_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${Token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching image data:", error);
    }
};

export default PlatillosGet