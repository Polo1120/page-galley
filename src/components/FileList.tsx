import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "./styles/index.css";
import CircularProgress from '@mui/material/CircularProgress';

interface FileObject {
  name: string;
}

interface ImageProps {
  largeURL: string;
  width: number;
  height: number;
  thumbnailURL: string;
}

const FileList: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const galleryID = "my-gallery"; 

  const fetchFileNames = async () => {
    try {
      setLoading(true); 
      const { data, error } = await supabase.storage.from("imgs").list();

      if (error) {
        throw error;
      }

      
      const imageList = await Promise.all(
        data?.map(async (file: FileObject) => {
          const largeURL = `https://amyromamxjdfgqmqvdeb.supabase.co/storage/v1/object/public/imgs/${file.name}`;
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

  useEffect(() => {
    fetchFileNames();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      let lightbox = new PhotoSwipeLightbox({
        gallery: `#${galleryID}`,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();

      return () => {
        lightbox.destroy();
      };
    }
  }, [images]);

  return (
    <div>
      <h2>Memories Love</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {loading ? (
        <>
        <div className="content-loader">
        <CircularProgress />
        </div>
        </>
      ) : (
        
        <div className="pswp-gallery Gallery" id={galleryID}>
          {images.map((image, index) => (
            <a
              href={image.largeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              key={`${galleryID}-${index}`}
              target="_blank"
              rel="noreferrer"
              className="link-gallery"
            >
              <img
                src={image.thumbnailURL}
                alt={`Image ${index}`}
                className="gallery-image"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
