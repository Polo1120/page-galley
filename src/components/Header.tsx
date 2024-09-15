import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import CustomModal from "./CustomModal";
import Login from "./Login";
import ImageUploader from "./ImageUploader";
import { AppBar, Toolbar, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = (confirm: boolean) => {
    setOpen(false);
    if (confirm) {
      logout();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <img
              src="/logo-gallery.png"
              alt="Logo"
              style={{ height: "40px", verticalAlign: "middle" }}
            />
            Memories Love
          </Link>
        </Typography>
        {isAuthenticated && (
          <>
            <ImageUploader />
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        )}
        {!isAuthenticated && (
          <CustomModal buttonText="Iniciar sesión" closeButtomText="X">
            <Login />
          </CustomModal>
        )}
      </Toolbar>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar cierre de sesión</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
