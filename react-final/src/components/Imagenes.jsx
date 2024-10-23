import React, { useState } from 'react';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `${file.name}-${Date.now()}`);
  
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setUrl(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <img src={url} alt="Uploaded Image" />}
    </div>
  );
};

export default UploadImage;



