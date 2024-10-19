import { useState } from "react";
import { FechImg } from "../services/imagesFech";

const ImageUpload = ({ restauranteId }) => {
    console.log(restauranteId);
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!selectedImage) {
            setError('Please select an image to upload.');
            return;
        }

        try {
            const response = await FechImg(selectedImage, restauranteId);
            setSuccessMessage(`Image uploaded successfully: ${response.url_img}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                <button type="submit">Upload Image</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </div>
    );
};

export default ImageUpload;
