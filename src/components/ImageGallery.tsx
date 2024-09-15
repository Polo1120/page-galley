import React, { useState } from "react";
import { Masonry } from "@mui/lab";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface ImageProps {
  largeURL: string;
  width: number;
  height: number;
  thumbnailURL: string;
  fileName: string;
  description: string;
}

interface ImageGalleryProps {
  images: ImageProps[];
  onDelete: (fileName: string) => void;
  galleryID: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onDelete,
  galleryID,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleDeleteClick = (image: ImageProps): void => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleConfirmDelete = (): void => {
    if (selectedImage) {
      onDelete(selectedImage.fileName);
      setSelectedImage(null);
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = (): void => {
    setSelectedImage(null);
    setOpenDialog(false);
  };

  const handleExpandClick = (imageId: string) => {
    setExpanded((prev) => ({ ...prev, [imageId]: !prev[imageId] }));
  };

  const handleCardClick = (image: ImageProps) => {
    const SUPABASE_URL_IMG = process.env.REACT_APP_SUPABASE_URL_IMG as string;
    navigate(`${SUPABASE_URL_IMG}/${image.fileName}`, { state: { image } });
  };

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2} id={galleryID}>
        {images.map((image, index) => {
          const imageId = `${galleryID}-${index}`;
          return (
            <Card key={imageId}>
              <CardActionArea onClick={() => handleCardClick(image)}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={image.thumbnailURL}
                  alt={image.fileName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {image.fileName}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <IconButton
                  aria-label={`delete ${image.fileName}`}
                  onClick={() => handleDeleteClick(image)}
                >
                  <DeleteIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded[imageId] || false}
                  onClick={() => handleExpandClick(imageId)}
                  aria-expanded={expanded[imageId] || false}
                  aria-label="mostrar más"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[imageId] || false} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Descripción:</Typography>
                  <Typography paragraph>{image.description}</Typography>
                  <Typography paragraph>Dimensiones:</Typography>
                  <Typography paragraph>
                    Ancho: {image.width}px, Alto: {image.height}px
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Masonry>

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar "{selectedImage?.fileName}"? Esta acción
            no se puede deshacer.
          </DialogContentText>
          <TextField
            margin="dense"
            id="description"
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedImage?.description}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageGallery;
