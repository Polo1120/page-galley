import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 
const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
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
        (document.querySelector('input[type="file"]') as HTMLInputElement).value = ''; 
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
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {loading && <div className="loading-bar">Uploading...</div>} 
    </div>
  );
};

export default ImageUploader;
