import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const uploadImage = async () => {
    if (selectedFile) {
      setLoading(true); 

      try {
        const fileName = selectedFile.name;
        const { error } = await supabase.storage
          .from('imgs') 
          .upload(fileName, selectedFile);

        if (error) {
          throw error;
        }

        alert("Upload successful!");
        setSelectedFile(null);
      } catch (error: any) {
        console.error('Error uploading file:', error.message);
        alert('Error uploading file. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: isDragging ? '#f0f0f0' : '#fff',
          marginBottom: '20px',
        }}
      >
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Drag & drop an image here or click to select</p>
        )}
      </div>

      <input
        type="file"
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
          }
        }}
        style={{ display: 'none' }} 
        id="fileInput"
      />
      
      <button onClick={() => document.getElementById('fileInput')?.click()}>
        Select Image
      </button>

      <button onClick={uploadImage} disabled={loading || !selectedFile}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {loading && <div className="loading-bar">Uploading...</div>}
    </div>
  );
};

export default ImageUploader;
