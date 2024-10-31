import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploaderMenu = ({ onFilesAccepted }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesAccepted(newFiles.map(fileObj => fileObj.preview)); // Pasa solo las URLs de las imágenes
    },
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', marginTop: '20px' }}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta archivos aquí o haz clic para buscar.</p>
      
      {files.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Imágenes subidas:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {files.map((fileObj, index) => (
              <div key={index} style={{ width: '100px', height: '100px' }}>
                <img 
                  src={fileObj.preview} 
                  alt={`Preview ${index + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderMenu;




