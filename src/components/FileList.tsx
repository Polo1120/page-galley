import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./styles/index.css";

interface FileObject {
  name: string;
}

const FileList: React.FC = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFileNames = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("imgs") 
        .list();

      if (error) {
        throw error;
      }

      const names = data?.map((file: FileObject) => file.name) || [];
      
      setFileNames(names);
    } catch (error: any) {
      console.error("Error fetching file names:", error.message);
      setError("Failed to fetch file names. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFileNames();
  }, []);

  return (
    <div>
      <h2>Memories Love</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <section className="Gallery">
        {fileNames.map((name, index) => (
          <div key={index}>
            <img
              src={`https://amyromamxjdfgqmqvdeb.supabase.co/storage/v1/object/public/imgs/${name}`}
              alt={name}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FileList;
