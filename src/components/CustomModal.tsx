import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import "./styles/index.css";

interface CustomModalProps {
  children: React.ReactNode;
  buttonText: string;
  closeButtomText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  buttonText,
  closeButtomText,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        {buttonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
           id="closeModal"
          >
            {closeButtomText}
          </Button>

          {children}
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
