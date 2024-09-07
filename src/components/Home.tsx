import React from "react";
import { useAuth } from "./AuthProvider";
import FileList from "./FileList";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <div className={!isAuthenticated ? "Home" : "Content"}>
      {!isAuthenticated && <></>}
      {isAuthenticated && (
        <>
          <FileList />
        </>
      )}
    </div>
  );
};

export default Home;
