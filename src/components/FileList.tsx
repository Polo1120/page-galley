import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ImageGallery from "./ImageGallery";
import CircularProgress from '@mui/material/CircularProgress';

interface FileObject {
  name: string;
}

interface ImageProps {
  largeURL: string;
  width: number;
  height: number;
  thumbnailURL: string;
  fileName: string;
  description: string; 
}

const FileList: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const galleryID = "my-gallery";

  const SUPABASE_URL_IMG = process.env.REACT_APP_SUPABASE_URL_IMG as string;

  const fetchFileNames = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from("imgs").list();

      if (error) {
        throw error;
      }

      const imageList = await Promise.all(
        data?.map(async (file: FileObject) => {
          const largeURL = `${SUPABASE_URL_IMG}/${file.name}`;
          const thumbnailURL = largeURL;

          const img = new Image();
          img.src = largeURL;

          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
          });

          return {
            largeURL,
            thumbnailURL,
            width: img.naturalWidth,
            height: img.naturalHeight,
            fileName: file.name,
            description: "", 
          };
        }) || []
      );

      setImages(imageList);
    } catch (error: any) {
      console.error("Error fetching file names:", error.message);
      setError("Failed to fetch file names. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (fileName: string) => {
    try {
      const { error } = await supabase.storage.from("imgs").remove([fileName]);
      if (error) {
        throw error;
      }

      setImages((prevImages) => prevImages.filter((img) => img.fileName !== fileName));
    } catch (error: any) {
      console.error("Error deleting image:", error.message);
      setError("Failed to delete the image. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFileNames();
  }, []);

  return (
    <div>
      <h2>Memories Love</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div className="content-loader">
          <CircularProgress />
        </div>
      ) : (
        <ImageGallery images={images} onDelete={deleteImage} galleryID={galleryID} />
      )}
    </div>
  );
};

export default FileList;
