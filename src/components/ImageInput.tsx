import React, { useState, useRef } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { Close, AddPhotoAlternate, PhotoCamera } from '@mui/icons-material';

interface ImageInputProps {
  onImageSelect: (file: File | null) => void;
  initialImage?: string;
  resetTrigger?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect, initialImage, resetTrigger }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hiddenCameraInput = useRef<HTMLInputElement>(null);

  // Reset image when resetTrigger changes
  React.useEffect(() => {
    if (resetTrigger) {
      setImage(null);
      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = '';
      }
      if (hiddenCameraInput.current) {
        hiddenCameraInput.current.value = '';
      }
    }
  }, [resetTrigger]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      onImageSelect(selectedFile);
    }
  };

  const handleFileUploadClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleCameraClick = () => {
    hiddenCameraInput.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageSelect(null);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
    if (hiddenCameraInput.current) {
      hiddenCameraInput.current.value = '';
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      mb: 2, 
      maxWidth: '100%', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      margin: '0 auto'
    }}>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleImageChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <input
        type="file"
        ref={hiddenCameraInput}
        onChange={handleImageChange}
        style={{ display: 'none' }}
        accept="image/*"
        capture="environment"
      />
      
      {image ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            height: 250,
            borderRadius: 3,
            overflow: 'hidden',
            border: '2px solid #1976d2',
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Preview do medicamento"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'white',
              color: '#666',
              width: 30,
              height: 30,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            minHeight: 200,
            borderRadius: 3,
            bgcolor: '#f0f4f8',
            border: '2px dashed #b0c4de',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            boxSizing: 'border-box',
          }}
        >
          <AddPhotoAlternate sx={{ fontSize: '4rem', mb: 2, color: '#a0a0a0' }} />
          <Typography variant="body2" sx={{ fontSize: '1rem', mb: 3, color: '#666', textAlign: 'center' }}>
            Adicione uma foto do medicamento
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<PhotoCamera />}
              onClick={handleCameraClick}
              sx={{ minWidth: 140 }}
            >
              Tirar Foto
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternate />}
              onClick={handleFileUploadClick}
              sx={{ minWidth: 140 }}
            >
              Galeria
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageInput;