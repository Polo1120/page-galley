import React, { useState } from "react";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import { supabase } from "./supabaseClient";

const ImageUploader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const uploadImages = async (files: FileList) => {
    setLoading(true); 

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const { error } = await supabase.storage
          .from("imgs")
          .upload(fileName, file);

        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      await uploadImages(files);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
        multiple
      />

      <Button variant="contained" color="secondary" onClick={() => document.getElementById("fileInput")?.click()}>
        Subir Imagenes
      </Button>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            zIndex: 1300,
          }}
        >
          <CircularProgress color="inherit" sx={{ mr: 2 }} />
          <Typography variant="body1">Sending images...</Typography>
        </Box>
      )}
    </div>
  );
};

export default ImageUploader;
