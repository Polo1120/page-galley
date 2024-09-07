import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import CustomModal from './CustomModal';
import Login from './Login';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src="/logo-gallery.png" alt="Logo" />
      </a>
      {isAuthenticated && (
        <>
          <Link to="/">Memories Love</Link>
          <Link to="/upload">Subir Image</Link>
          <button onClick={logout} className="logout">
            Cerrar session
          </button>
        </>
      )}
      {!isAuthenticated && (
        <>
        <div className="content-login">
        <CustomModal  buttonText="Iniciar session" closeButtomText="X">
          <Login />
        </CustomModal>
        </div>
       
        </>
      )}
    </header>
  );
};

export default Header;
